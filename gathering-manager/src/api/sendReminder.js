import { sendEmail } from './email/sendEmail.js';
import supabase from './supabase-client.js';

export default async function handler(req, res) {

  await sendEmail("kalebmscott1029@gmail.com");

  let startTime = new Date();
  let endTime = new Date(startTime);
  endTime.setDate(endTime.getDate() + 1);

  console.log(`start time: ${startTime}\nend time: ${endTime}`);

  const {data, error} = await supabase
  .from("Gatherings")
  .select("*")
  .eq("serviced", false)
  .gt("time", startTime.toLocaleString())
  .lte("time", endTime.toLocaleString());

  if(error) {
    console.log("Encountered error while sending reminder emails: " + error.message);
    return;
  }

  for(const gathering of data) {
    const {data: rsvpData, error: rsvpError} = await supabase
    .from("RSVP")
    .select("*")
    .eq("gatheringID", gathering.id);

    if(rsvpError) {
      console.log("Failed to retrieve RSVP data for a gathering: " + error.message);
      continue;
    }

    for(const rsvp of rsvpData) {
      const {data: userData, error: userError} = await supabase
      .from("Users")
      .select("*")
      .eq("id", rsvp.userID);

      if(userError) {
        console.log("Failed to retrieve data for user: " + userError.message);
        continue;
      }

      await sendEmail(userData.email);
    }
  }
}
