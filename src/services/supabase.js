import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://faomonxlagvzvmjtzgul.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhb21vbnhsYWd2enZtanR6Z3VsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc2NTA2ODUsImV4cCI6MjAzMzIyNjY4NX0.cz7p_KDZyDhtyeNTW7r-7Vs9fV-TY3IsDF6pQREGoE8";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
