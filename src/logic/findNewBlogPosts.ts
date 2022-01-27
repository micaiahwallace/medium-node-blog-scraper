import { BlogPost } from '../types'

export const findNewBlogPosts = (
  before: BlogPost[],
  after: BlogPost[],
  max: number
): BlogPost[] => {
  const newPosts: BlogPost[] = []
  after.forEach((post) => {
    const matchedCachePostByTime = before.find(
      (beforePost) => beforePost.time === post.time
    )
    if (newPosts.length < max && matchedCachePostByTime === undefined) {
      newPosts.push(post)
    }
  })

  // Reversing will return the posts in correct time sort order for queueing notifications
  return [...newPosts].reverse()
}
