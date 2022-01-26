import twilio from 'twilio'

export const sendTwilioMessage = async (sid: string, token: string, from: string, to: string, message: string) => {
  const client = twilio(sid, token)
  await client.messages.create({
    body: message,
    to,
    from,
  })
}