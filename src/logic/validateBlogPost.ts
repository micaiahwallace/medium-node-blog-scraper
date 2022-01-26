import { BlogPost } from '../types'

/**
 * Todo: determine if this fn should return a bool indicating valid, or return the blogpost when validated with undefined when not valid
 * or follow promise allSettled format of .success = true | false then .value = BlogPost if .success is true
 */
export const getValidatedBlogPost = (post: any): BlogPost | undefined => {
  if (typeof post !== 'object') return undefined
  if (typeof post.title !== 'string') return undefined
  if (typeof post.time !== 'string') return undefined
  if (typeof post.summary !== 'string') return undefined
  return {
    title: post.title,
    time: post.time,
    summary: post.summary,
  }
}

export const getValidatedBlogPosts = (posts: any): BlogPost[] => {
  if (!Array.isArray(posts)) return []
  return posts.map(post => getValidatedBlogPost(post)).filter(Boolean) as BlogPost[]
}