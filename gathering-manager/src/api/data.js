import supabase from "./supabase-client";

export async function getUsers() {
    const {data} = await supabase.from("Users").select();
    return data;
}