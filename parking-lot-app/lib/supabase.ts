import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wyvffruhfujxfovreyrm.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dmZmcnVoZnVqeGZvdnJleXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MjU4NzksImV4cCI6MjA1ODUwMTg3OX0.4A2YosUxQBp4AduVBVAziyFDUeMC5nijqb5Y3C-YkdQ';

export const supabase = createClient(supabaseUrl, supabaseKey); 