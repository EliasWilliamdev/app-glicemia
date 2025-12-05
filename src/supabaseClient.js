// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://rxxyykteginhijklzgrp.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'sb_publishable_WtFPT8nraN-GUDFUqVfDWw_O624A8JX';

export const supabase = createClient(supabaseUrl, supabaseKey);
