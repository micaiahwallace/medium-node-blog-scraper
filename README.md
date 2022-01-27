# Node Blog Notifier

This utility scrapes the Nodejs.org news blog page and sends an sms notification with any new updates since it was last run.

You need to have a Twilio number setup and the following environment variables set in from env.sh.template:

- TWILIO_TOKEN - Twilio auth token
- TWILIO_SID - Twilio account SID
- SMS_FROM - Twilio number including country code
- SMS_TO - Number to send SMS notifications to
