#!/usr/bin/env node
import { fetchCachedBlogPosts } from './coordinators/fetchCachedBlogPosts'
import { scrapeNodeBlog } from './coordinators/scrapeNodeBlog'
import { ioWriteFileJson } from './services/ioWriteFile'
import { sendTwilioMessage } from './services/sendTwilioMessage'

const NODE_BLOG_URL = 'https://nodejs.org/en/blog/'
const BLOG_POST_CACHE_FILE = 'cached-posts.json'

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
  blogUrl: NODE_BLOG_URL,
  notify: (post) => sendTwilioMessage(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, SMS_FROM, SMS_TO, `Node blog posted a new update! ${post.title} at ${post.time}`),
  readPostCache: () => fetchCachedBlogPosts(BLOG_POST_CACHE_FILE),
  writePostCache: (posts) => ioWriteFileJson(BLOG_POST_CACHE_FILE, posts)
})