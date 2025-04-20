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
    console.log("createGathering was run.");
    console.log(`name: ${name}`);
    console.log(`time: ${time}`);
    console.log(`description: ${description}`);
    console.log(`tags: ${tags}`);
    console.log(`tags0: ${tags[0]}`)
    console.log(`isPublic: ${isPublic}`);

    const {data, error} = await supabase.from("Gatherings").insert([{
        name: name,
        time: time,
        description: description,
        hostID: 0,
        Tags: tags,
        isPublic: isPublic,
    }]).select("rsvp_code, attendance_code").single();

    /*const {data, error} = await supabase.from("Gatherings").insert({
        id: 0,
        name: "Go Home",
        time: "2025-04-19T13:30",
        description: "Testing gathering upload.",
        hostID: 0,
        Tags: ["Party"],
        isPublic: true,
        serviced: false,
        rsvp_code: "a",
        attendance_code: "b"
    });*/

    if(error) {
        console.log("Failed to upload data: " + error.message);
        return null;
    } else {
        console.log("upload successful");
        console.log(`data in insert: ${data}`);
        console.log(`data[0]: ${data[0]}`);
        console.log(`error ${error}`);
        return data;
    }
}