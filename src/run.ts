#!/usr/bin/env node
import { fetchCachedBlogPosts } from './coordinators/fetchCachedBlogPosts'
import { scrapeNodeBlog } from './coordinators/scrapeNodeBlog'
import { formatDate } from './logic/formatDate'
import { ioWriteFileJson } from './services/ioWriteFile'
import { log } from './services/log'
import { sendTwilioMessage } from './services/sendTwilioMessage'

// Display title and version
const { version } = require('../package.json')
log(`=== Node News Scraper (${version}) ===`)

// Configure the web scraper with these constants
const NODE_BLOG_URL = 'https://nodejs.org/en/blog/'
const BLOG_POST_CACHE_FILE = 'cached-posts.json'
const MAX_NOTIFICATIONS = 3

const requireStringVar = (v: string, msg: string) => {
  if (v === '') {
    log(msg)
    process.exit(1)
  }
}

// Further secret configuration for notifications
const TWILIO_ACCOUNT_SID = process.env.TWILIO_SID ?? ''
const TWILIO_AUTH_TOKEN = process.env.TWILIO_TOKEN ?? ''
const SMS_FROM = process.env.SMS_FROM ?? ''
const SMS_TO = process.env.SMS_TO ?? ''

requireStringVar(TWILIO_ACCOUNT_SID, 'TWILIO_SID missing in env')
requireStringVar(TWILIO_AUTH_TOKEN, 'TWILIO_AUTH_TOKEN missing in env')
requireStringVar(SMS_FROM, 'SMS_FROM missing in env')
requireStringVar(SMS_TO, 'SMS_TO missing in env')

scrapeNodeBlog({
  maxNotify: MAX_NOTIFICATIONS,
  blogUrl: NODE_BLOG_URL,
  readPostCache: () => fetchCachedBlogPosts(BLOG_POST_CACHE_FILE),
  writePostCache: (posts) => ioWriteFileJson(BLOG_POST_CACHE_FILE, posts),
  notify: (post) =>
    sendTwilioMessage(
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
      SMS_FROM,
      SMS_TO,
      `\nNode news update!\n${post.title}\nposted at: ${formatDate(post.time)}`
    ),
})
