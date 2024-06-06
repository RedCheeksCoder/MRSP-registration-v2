import supabase from "./services/supabase";
export const insertData = async (formData) => {
  const { data, error } = await supabase
    .from("mrsp_registration") // replace with your actual table name
    .insert([formData]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
