import { sendEmail } from '../sendEmail.js';

export default async function handler(req, res) {
  await sendEmail('bjohnson130@my.apsu.edu');
}
