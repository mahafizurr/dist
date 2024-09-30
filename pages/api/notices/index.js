import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fetch notices
const getNotices = async () => {
  const { data, error } = await supabase.from("dist_data_table").select("*");
  if (error) throw new Error(error.message);
  return data;
};

// Function to insert a new notice
const createNotice = async (notice) => {
  const { data, error } = await supabase
    .from("dist_data_table")
    .insert([notice]);
  if (error) throw new Error(error.message);
  return data[0];
};

export default async function handler(req, res) {
  const { noticeId } = req.query;

  if (req.method === "GET") {
    if (noticeId) {
      const notices = await getNotices();
      const notice = notices.find((notice) => notice.id === parseInt(noticeId));

      if (!notice) {
        return res.status(404).json({ error: "Notice not found" });
      }
      return res.status(200).json(notice);
    }

    // Return all notices if no noticeId is provided
    const notices = await getNotices();
    return res.status(200).json(notices);
  } else if (req.method === "POST") {
    try {
      const notice = req.body;

      // Validate notice data if needed
      if (!notice.title || !notice.content) {
        return res
          .status(400)
          .json({ error: "Title and content are required" });
      }

      const newNotice = await createNotice(notice);
      return res.status(201).json(newNotice);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
