import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uryrakdrisjicsnmtgdq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyeXJha2RyaXNqaWNzbm10Z2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MjcxNzIsImV4cCI6MjA4OTMwMzE3Mn0.g5jgbp97vwosPmyjghktTBNSOpQqi2uaHvdv-P0FBmM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
