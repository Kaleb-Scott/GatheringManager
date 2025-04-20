import supabase from "./supabase-client";

export async function getUsers() {
    const {data} = await supabase.from("Users").select();
    return data;
}

export async function getPublicGatherings() {
    const {data, error} = await supabase.from("Gatherings").select("*").eq("isPublic", true);

    if(error || !data) {
        console.log("Failed to retrieve public gathering data.");
    } else {
        return data;
    }
}

export async function getTags() {
    const {data, error} = await supabase.rpc("get_tags_enum");

    if(error) {
        console.log("Failed to retrieve tags.");
        return [];
    } else {
        return data;
    }
}

export async function createGathering(name, time, description, tags, isPublic) {
    
}