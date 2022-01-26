#!/usr/bin/env node
import { scrapeNodeBlog } from './coordinators/scrapeNodeBlog'

const NODE_BLOG_URL = 'https://nodejs.org/en/blog/'
const BLOG_POST_CACHE_FILE = 'cached-posts.json'

scrapeNodeBlog({
  blogUrl: NODE_BLOG_URL,
  cacheFilePath: BLOG_POST_CACHE_FILE
})