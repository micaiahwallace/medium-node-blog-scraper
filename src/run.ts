#!/usr/bin/env node
import { fetchCachedBlogPosts } from './coordinators/fetchCachedBlogPosts'
import { scrapeNodeBlog } from './coordinators/scrapeNodeBlog'
import { ioWriteFileJson } from './services/ioWriteFile'
import { sendTwilioMessage } from './services/sendTwilioMessage'

// Configure the web scraper with these constants
const NODE_BLOG_URL = 'https://nodejs.org/en/blog/'
const BLOG_POST_CACHE_FILE = 'cached-posts.json'
const MAX_NOTIFICATIONS = 5

// Further secret configuration for notifications
const TWILIO_ACCOUNT_SID = process.env.TWILIO_SID ?? ''
const TWILIO_AUTH_TOKEN = process.env.TWILIO_TOKEN ?? ''
const SMS_FROM = process.env.SMS_FROM ?? ''
const SMS_TO = process.env.SMS_TO ?? ''

const requireStringVar = (v: string, msg: string) => {
  if (v === '') {
    console.error(msg)
    process.exit(1)
  }
}

requireStringVar(TWILIO_ACCOUNT_SID, 'TWILIO_SID missing in env')
requireStringVar(TWILIO_AUTH_TOKEN, 'TWILIO_AUTH_TOKEN missing in env')
requireStringVar(SMS_FROM, 'SMS_FROM missing in env')
requireStringVar(SMS_TO, 'SMS_TO missing in env')

scrapeNodeBlog({
  maxNotify: MAX_NOTIFICATIONS,
  blogUrl: NODE_BLOG_URL,
  notify: (post) => {
    return sendTwilioMessage(
      TWILIO_ACCOUNT_SID, 
      TWILIO_AUTH_TOKEN, 
      SMS_FROM, 
      SMS_TO, 
      `Node blog posted a new update! ${post.title} at ${post.time}`
    )
  },
  readPostCache: () => fetchCachedBlogPosts(BLOG_POST_CACHE_FILE),
  writePostCache: (posts) => ioWriteFileJson(BLOG_POST_CACHE_FILE, posts)
})