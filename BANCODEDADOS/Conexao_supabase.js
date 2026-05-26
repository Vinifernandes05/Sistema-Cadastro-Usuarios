const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = "https://ksjjxshygiodrkyktdoi.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtzamp4c2h5Z2lvZHJreWt0ZG9pIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTc2OTExNCwiZXhwIjoyMDk1MzQ1MTE0fQ.OxGH62f67cMmyRNXo53X0JWirA1N1O-g4qGO9VSoF0E"

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase