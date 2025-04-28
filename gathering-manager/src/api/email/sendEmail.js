import fetch, { Headers } from 'node-fetch';
import { Resend } from 'resend';
import { getName, getInfo } from './gathering.js';

global.Headers = Headers;
global.fetch = fetch;

const resend = new Resend('re_dpPa2rhr_HbBrmwZdpv9QHRbpUuzFq6zg');

export async function sendEmail(email) {
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: `Reminder for ${getName()}`,
    html: `<p>This is an automated reminder for your gathering, ${getName()}.</p>
           ${getInfo()}`
  });
}

//export { sendEmail };
