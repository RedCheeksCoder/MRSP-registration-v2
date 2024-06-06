import supabase from "./services/supabase";

export async function getDatabase() {
  const { data, error } = await supabase.from("mrsp_registration").select("*");

  if (error) {
    console.log("There's something wrong with loading the data.");
  }

  return data;
}
