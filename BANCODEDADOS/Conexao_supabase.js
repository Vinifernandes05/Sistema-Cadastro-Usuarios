const { createClient } = require("@supabase/supabase-js")

const supabaseUrl = "https://ksjjxshygiodrkyktdoi.supabase.co"
const supabaseKey = "sb_publishable_aPtXZezKxOjAZjAbCSFFlQ_X-GOMcal"

const supabase = createClient(supabaseUrl, supabaseKey)

module.exports = supabase