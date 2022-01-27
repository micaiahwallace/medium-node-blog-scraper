import { fetchCachedBlogPosts } from './fetchCachedBlogPosts'
import { fetchNewBlogPosts } from './fetchNewBlogPosts'
import { watchListAndNotify } from './watchListAndNotify'
import { findNewBlogPosts } from '../logic/findNewBlogPosts'
import { ioWriteFileJson } from '../services/ioWriteFile'
import { sendTwilioMessage } from '../services/sendTwilioMessage'
import { log } from '../services/log'
import { BlogPost } from '../types'

interface ScrapeNodeBlogArgs {
  blogUrl: string
  maxNotify: number
  writePostCache: (posts: BlogPost[]) => Promise<void>
  readPostCache: () => Promise<BlogPost[]>
  notify: (post: BlogPost) => Promise<void>
}

export const scrapeNodeBlog = async ({
  blogUrl,
  maxNotify,
  writePostCache,
  readPostCache,
  notify,
}: ScrapeNodeBlogArgs) => {
  await watchListAndNotify({
    fetchNewItems: async () => {
      log('fetching new blog posts')
      const posts = await fetchNewBlogPosts(blogUrl)
      await writePostCache(posts)
      return posts
    },
    fetchOldItems: async () => {
      log('retrieving cached blog posts')
      return readPostCache()
    },
    getNotifiableItems: (cached, fresh) => {
      log('comparing cached and fresh posts to find which ones need notified')
      return findNewBlogPosts(cached, fresh, maxNotify)
    },
    notify: async (post) => {
      log(`New post found! ${post.title} posted at ${post.time}`)
      await notify(post)
    },
    log,
  })
}
