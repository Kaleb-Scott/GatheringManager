import supabase from "./supabase-client";

export async function getUsers() {
    const {data} = await supabase.from("Users").select();
    return data;
}

export async function registerUser(username, email) {
    console.log("in register")
    const {error} = await supabase.from("Users").insert({
        username: username,
        email: email
    });

    if(error) {
        console.log("Failed to register user." + error.message);
        return false;
    } else {
        console.log("success")
        return true;
    }
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

    let userData = await getCurrentUserData();

    const {data, error} = await supabase.from("Gatherings").insert([{
        name: name,
        time: time,
        description: description,
        hostID: userData.id,
        Tags: tags,
        isPublic: isPublic,
    }]).select("rsvp_code, attendance_code").single();

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

export async function updateGathering(gatheringID, name, time, description, tags, isPublic) {
    console.log("updateGathering was run.");
    console.log(`name: ${name}`);
    console.log(`time: ${time}`);
    console.log(`description: ${description}`);
    console.log(`tags: ${tags}`);
    console.log(`tags0: ${tags[0]}`)
    console.log(`isPublic: ${isPublic}`);

    const {error} = await supabase.from("Gatherings").update([{
        name: name,
        time: time,
        description: description,
        Tags: tags,
        isPublic: isPublic,
    }]).eq("id", gatheringID);

    if(error) {
        console.log("Failed to update data: " + error.message);
        return false;
    } else {
        return true;
    }
}

export async function getCurrentUserData() {
    
    if(localStorage.getItem("isLoggedIn") === "false") {
        return null;
    }

    const {data, error} = await supabase.from("Users").select("*").eq("email", localStorage.getItem("userEmail")).single();
    //const {data, error} = await supabase.from("Users").select("*").eq("email", "Ben@Yahoo.com").single();

    if(error) {
        console.log("Failed to retrieve user's data: " + error.message);
        return null;
    } else {
        return data;
    }
}

export async function getRegisteredGatherings() {
    //TODO: get userID based on current email

    let userData = await getCurrentUserData();

    if(!userData) {
        return [];
    }

    const {data: rsvpData, error: rsvpError} = await supabase.from("RSVP").select("gatheringID").eq("userID", userData.id);

    if(rsvpError) {
        console.log("Failed to retrieve rsvped gatherings: " + rsvpError.message);
        return [];
    }

    let ids = rsvpData.map(id => id.gatheringID);

    const {data: resultData, error: resultError} = await supabase.from("Gatherings").select("*").in("id", ids).gt("time", new Date().toISOString());

    if(resultError) {
        console.log("Failed to retrieve registered Gatherings: " + resultError.message);
        return [];
    }

    return resultData;
}

export async function getCurrentGatherings() {
    //TODO: get userID based on current email

    let userData = await getCurrentUserData();

    if(!userData) {
        return [];
    }

    const {data, error} = await supabase.from("Gatherings").select("*").eq("hostID", userData.id).gt("time", new Date().toLocaleString());

    if(error) {
        console.log("failed to retrieve current gatherings" + error.message);
        return [];
    } else {
        return data;
    }
}

export async function getPastGatherings() {
    //TODO: get userID based on current email

    let userData = await getCurrentUserData();

    if(!userData) {
        return [];
    }

    const {data, error} = await supabase.from("Gatherings").select("*").eq("hostID", userData.id).lt("time", new Date().toLocaleString());

    if(error) {
        console.log("failed to retrieve current gatherings" + error.message);
        return [];
    } else {
        return data;
    }
}

export async function getGatheringByRSVPCode(rsvp_code) {
    const {data, error} = await supabase.from("Gatherings").select("*").eq("rsvp_code", rsvp_code).single();

    if(error || !data) {
        console.log("Failed to retrieve gathering data. Error: " + error.message);
        return null;
    } else {
        return data;
    }
}

export async function getGatheringByAttendanceCode(attendance_code) {
    const {data, error} = await supabase.from("Gatherings").select("*").eq("attendance_code", attendance_code).single();

    if(error || !data) {
        console.log("Failed to retrieve gathering data. Error: " + error.message);
        return null;
    } else {
        return data;
    }
}

export async function unregister(gatheringID) {
    let userData = await getCurrentUserData();

    if(!userData) {
        return false;
    }

    const response = await supabase.from("RSVP").delete().eq("gatheringID", gatheringID).eq("userID", userData.id);

    if(response.status !== 204 && response.status !== 200) {
        console.log("statusText: " + response.statusText);
        return false;
    }

    return true;
}

export async function rsvpUser(gatheringID) {
    let userData = await getCurrentUserData();

    if(!userData) {
        return false;
    }

    const {data: checkData, error: checkError} = await supabase.from("RSVP").select("*").eq("userID", userData.id).eq("gatheringID", parseInt(gatheringID));

    console.log("debug 1");
    console.log(`userData: ${userData}`)
    console.log(`userID: ${userData.id}\ngatheringID: ${gatheringID}`);
    console.log(checkData);
    console.log("error" + checkError);

    if(checkData.length || checkError) {
        console.log("some error");
        return false;
    }
    const {data: insertData, error: insertError} = await supabase.from("RSVP").insert([{
        userID: userData.id,
        gatheringID: gatheringID
    }]).select().single();

    console.log("debug 2");

    if(insertError) {
        console.log("Error occured while performing RSVP: " + insertError.message);
    } else if(!insertData) {
        console.log("Falied to upload RSVP to server.");
    }

    return insertData ? true : false;
}

export async function confirmAttendance(gatheringID) {
    let userData = await getCurrentUserData();

    if(!userData) {
        return false;
    }

    const {data: checkData, error: checkError} = await supabase.from("Attendance").select("*").eq("userID", userData.id).eq("gatheringID", parseInt(gatheringID));

    console.log("debug 1");
    console.log(`userData: ${userData}`)
    console.log(`userID: ${userData.id}\ngatheringID: ${gatheringID}`);
    console.log(checkData);
    console.log("error" + checkError);

    if(checkData.length || checkError) {
        console.log("some error");
        return false;
    }
    const {data: insertData, error: insertError} = await supabase.from("Attendance").insert([{
        userID: userData.id,
        gatheringID: gatheringID
    }]).select().single();

    console.log("debug 2");

    if(insertError) {
        console.log("Error occured while confirming attendance: " + insertError.message);
    } else if(!insertData) {
        console.log("Falied to upload attendance record to server.");
    }

    return insertData ? true : false;
}

export async function deleteGathering(gatheringID) {
    const {data, error} = await supabase.from("Gatherings").delete().eq("id", gatheringID);

    if(error) {
        console.log(`Failed to delete gathering: ${error.message}`);
        return false;
    } else {
        return true;
    }
}