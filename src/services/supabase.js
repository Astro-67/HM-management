
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://ixorxcbqmtxmzcreznmp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4b3J4Y2JxbXR4bXpjcmV6bm1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4ODE5ODcsImV4cCI6MjA2MjQ1Nzk4N30.SzDA6fJQdVcUofyCU8dzbUEEQw4Hqgy1U95mUnGeF38"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;