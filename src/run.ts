import { fetchNewBlogPosts } from './coordinators/fetchNewBlogPosts'
import { watchListAndNotify } from './coordinators/watchListAndNotify'
import { findNewBlogPosts } from './logic/findNewBlogPosts'
import { ioGetFileJson } from './services/ioGetFile'

const NODE_BLOG_URL = 'https://nodejs.org/en/blog/'
const BLOG_POST_CACHE_FILE = 'cached-posts.json'

const log = (...msg: any[]) => {
  console.log(new Date(), '>', ...msg)
}

async function run() {
  watchListAndNotify({
    fetchNewItems: () => {
      log('fetching new blog posts')
      return fetchNewBlogPosts(NODE_BLOG_URL)
    },
    fetchOldItems: async () => {
      log('retrieving cached blog posts')
      const cachedPostData = ioGetFileJson(BLOG_POST_CACHE_FILE)
      return []
    },
    getNotifiableItems: findNewBlogPosts,
    notify: async (post) => { console.log('notify post:', post.title, post.time); return true },
    log: console.log,
  })
}

run()
