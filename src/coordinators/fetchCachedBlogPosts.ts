import { getValidatedBlogPosts } from '../logic/validateBlogPost'
import { ioGetFileJsonArray } from '../services/ioGetFile'
import { BlogPost } from '../types'

export const fetchCachedBlogPosts = async (
  file: string
): Promise<BlogPost[]> => {
  const cachedPostArrayRaw = await ioGetFileJsonArray(file)
  return getValidatedBlogPosts(cachedPostArrayRaw)
}
