import Cheerio from 'cheerio'
import { BlogPost } from '../types'

export const extractNodeBlogPosts = (html: string): BlogPost[] => {
  const posts: BlogPost[] = []
  const $ = Cheerio.load(html)
  $('ul.blog-index > li').each((_i, li) => {
    const title = $(li).find('> a').eq(0).text()
    const time = $(li).find('time').attr('datetime') ?? ''
    const summary = $(li).find('div.summary h4').text()
    posts.push({ title, time, summary })
  })
  return posts
}
