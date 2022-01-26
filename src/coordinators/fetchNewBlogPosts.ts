import { extractNodeBlogPosts } from '../logic/extractNodeBlogPosts'
import { extractNodeNextPage } from '../logic/extractNodeNextPage'
import { ioFetchUrlText } from '../services/ioFetchUrlText'
import { BlogPost } from '../types'

export const fetchNewBlogPosts = async (blogUrl: string): Promise<BlogPost[]> => {
  const html = await ioFetchUrlText(blogUrl)
  const posts = extractNodeBlogPosts(html)
  const nextPageLink = extractNodeNextPage(html)
  if (nextPageLink) {
    const nextPageUrl = new URL(nextPageLink, blogUrl).href
    console.log("Fetching next page of posts.", nextPageUrl)
    return posts.concat(await fetchNewBlogPosts(nextPageUrl))
  }
  // @todo - Persist posts to cache here
  return posts
}