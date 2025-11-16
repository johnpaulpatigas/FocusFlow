// index.js
import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ error: "Invalid token" });
  }
  req.user = user;
  next();
};

app.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) return res.status(400).json({ error: authError.message });
  if (!authData.user)
    return res.status(500).json({ error: "User not created" });

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ first_name: firstName, last_name: lastName })
    .eq("id", authData.user.id);

  if (profileError) {
    console.error("Profile update failed:", profileError.message);
  }

  return res.status(201).json(authData);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
  return res.status(200).json({ session: data.session });
});

app.get("/profile", authMiddleware, async (req, res) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("first_name, last_name, study_year, major, avatar_url")
    .eq("id", req.user.id)
    .single();

  if (error) return res.status(400).json({ error: error.message });

  const profileData = {
    ...data,
    email: req.user.email,
  };

  return res.status(200).json(profileData);
});

app.get("/dashboard-stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const today = new Date().toISOString().split("T")[0];

    const { count: tasksDueToday, error: tasksError } = await supabase
      .from("tasks")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("deadline", today)
      .neq("status", "Completed");

    const { data: upcomingTasks, error: upcomingError } = await supabase
      .from("tasks")
      .select("name, deadline")
      .eq("user_id", userId)
      .neq("status", "Completed")
      .order("deadline", { ascending: true })
      .limit(2);

    const { data: weeklyFocusData, error: weeklyFocusError } =
      await supabase.rpc("get_weekly_focus_hours", { user_id_param: userId });

    if (tasksError || upcomingError || weeklyFocusError) {
      throw tasksError || upcomingError || weeklyFocusError;
    }

    return res.status(200).json({
      tasksDueToday: tasksDueToday || 0,
      upcomingTasks: upcomingTasks || [],
      currentStreak: 5,
      weeklyFocusHours: weeklyFocusData || [],
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

app.get("/tasks", authMiddleware, async (req, res) => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", req.user.id)
    .order("created_at", { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  return res.status(200).json(data);
});

app.post("/tasks", authMiddleware, async (req, res) => {
  const { name, deadline, priority, category } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Task name is required." });
  }
  const { data, error } = await supabase
    .from("tasks")
    .insert([
      {
        name,
        deadline,
        priority,
        category,
        user_id: req.user.id,
        status: "Pending",
      },
    ])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  return res.status(201).json(data[0]);
});

app.put("/tasks/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: "Status is required." });
  }

  const { data, error } = await supabase
    .from("tasks")
    .update({ status })
    .eq("id", id)
    .eq("user_id", req.user.id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  if (!data || data.length === 0)
    return res.status(404).json({
      error: "Task not found or you do not have permission to edit it.",
    });

  return res.status(200).json(data[0]);
});

app.delete("/tasks/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
    .eq("user_id", req.user.id);

  if (error) return res.status(400).json({ error: error.message });

  return res.status(204).send();
});

app.post("/focus-sessions", authMiddleware, async (req, res) => {
  const { duration_minutes, task_id } = req.body;

  if (!duration_minutes || duration_minutes <= 0) {
    return res.status(400).json({ error: "Valid duration is required." });
  }

  const { data, error } = await supabase
    .from("focus_sessions")
    .insert([
      {
        user_id: req.user.id,
        duration_minutes,
        task_id: task_id || null,
      },
    ])
    .select();

  if (error) {
    console.error("Failed to save focus session:", error);
    return res.status(400).json({ error: error.message });
  }

  return res.status(201).json(data[0]);
});

app.get("/progress-stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const { data: weeklyFocus, error: focusError } = await supabase.rpc(
      "get_weekly_focus_hours",
      { user_id_param: userId },
    );

    const { data: tasksCompleted, error: tasksError } = await supabase.rpc(
      "get_tasks_completed_last_7_days",
      { user_id_param: userId },
    );

    const { data: streak, error: streakError } = await supabase.rpc(
      "calculate_streak",
      { user_id_param: userId },
    );

    if (focusError || tasksError || streakError) {
      throw focusError || tasksError || streakError;
    }

    return res.status(200).json({
      weeklyFocusHours: weeklyFocus || [],
      tasksCompletedOverTime: tasksCompleted || [],
      studyStreak: streak || 0,
      totalTasks: 42,
      completedTasks: 36,
    });
  } catch (error) {
    console.error("Error fetching progress stats:", error);
    return res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
