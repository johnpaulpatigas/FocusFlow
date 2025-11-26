-- tasks.sql
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  deadline DATE,
  priority TEXT DEFAULT 'Medium'::text,
  category TEXT,
  status TEXT DEFAULT 'Pending'::text NOT NULL
);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own tasks"
ON public.tasks FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tasks"
ON public.tasks FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tasks"
ON public.tasks FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tasks"
ON public.tasks FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER handle_task_update
BEFORE UPDATE ON public.tasks
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

COMMENT ON COLUMN public.tasks.name IS 'The title or name of the task.';
COMMENT ON COLUMN public.tasks.priority IS 'Priority level, e.g., High, Medium, Low.';
COMMENT ON COLUMN public.tasks.status IS 'Current status, e.g., Pending, In Progress, Completed.';
