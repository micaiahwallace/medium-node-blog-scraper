import { fetchCachedBlogPosts } from './fetchCachedBlogPosts'
import { fetchNewBlogPosts } from './fetchNewBlogPosts'
import { watchListAndNotify } from './watchListAndNotify'
import { findNewBlogPosts } from '../logic/findNewBlogPosts'
import { log } from '../services/log'
import { ioWriteFileJson } from '../services/ioWriteFile'

interface ScrapeNodeBlogArgs {
  blogUrl: string
  cacheFilePath: string
}

export const scrapeNodeBlog = async ({
  blogUrl,
  cacheFilePath,
}: ScrapeNodeBlogArgs) => {
  await watchListAndNotify({
    fetchNewItems: async () => {
      log('fetching new blog posts')
      const posts = await fetchNewBlogPosts(blogUrl)
      await ioWriteFileJson(cacheFilePath, posts)
      return posts
    },
    fetchOldItems: async () => {
      log('retrieving cached blog posts')
      return fetchCachedBlogPosts(cacheFilePath)
    },
    getNotifiableItems: (cached, fresh) => {
      log('comparing cached and fresh posts to find which ones need notified')
      return findNewBlogPosts(cached, fresh)
    },
    notify: async (post) => {
      log(`New post found! ${post.title} posted at ${post.time}`)
      return true
    },
    log,
  })
}

