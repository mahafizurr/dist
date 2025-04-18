import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function createCommittee({ name, designation, year }) {
  const { data, error } = await supabase
    .from("committees")
    .insert([{ name, designation, year }])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function getCommittees(filters = {}) {
  const query = supabase.from("committees").select("*");

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined) {
      query.eq(key, value);
    }
  });

  const { data, error } = await query.order("year", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCommitteeById(id) {
  return (await getCommittees({ id }))[0];
}

export async function updateCommittee(id, updates) {
  const { data, error } = await supabase
    .from("committees")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}

export async function deleteCommittee(id) {
  const { data, error } = await supabase
    .from("committees")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    throw new Error(error.message);
  }

  return data[0];
}
