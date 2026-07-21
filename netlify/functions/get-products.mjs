import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async () => {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, category, price, tag, blurb, note")
    .eq("active", true)
    .order("created_at", { ascending: true });

  if (error) {
    return new Response(JSON.stringify({ error: "Could not load products." }), { status: 500 });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
