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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
