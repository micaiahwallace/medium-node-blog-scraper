import { BlogPost } from '../types'

export const findNewBlogPosts = (before: BlogPost[], after: BlogPost[]): BlogPost[] => {
  const newPosts: BlogPost[] = []
  after.forEach(post => {
    if (before.find(beforePost => beforePost.time === post.time) === undefined) {
      newPosts.push(post)
    }
  })
  return newPosts
}