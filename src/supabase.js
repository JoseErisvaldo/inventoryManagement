import { createClient } from "@supabase/supabase-js";



const supabase = createClient("https://pcrvriqoysnjndzbebso.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcnZyaXFveXNuam5kemJlYnNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MDg0OTAsImV4cCI6MjA1MDQ4NDQ5MH0.glk9tqS6tGOux8BXozTmzH7DzLHZ18Z3JjMekLYeBC0");

export default supabase