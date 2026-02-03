import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://edgtykponzbytgdtcvpp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZ3R5a3BvbnpieXRnZHRjdnBwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNTQxNjAsImV4cCI6MjA4NTYzMDE2MH0.paDHORH_3g0HMeygsBknkFbe9yqyO2SkKZ3GVsIAvmo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
