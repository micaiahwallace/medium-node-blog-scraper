import Cheerio from 'cheerio'

export const extractNodeNextPage = (html: string): string | undefined => {
  const $ = Cheerio.load(html)
  let returnLink: string | undefined
  $('nav.pagination > a').each((_i, linkEl) => {
    if ($(linkEl).text().toLowerCase().includes('older')) {
      returnLink = linkEl.attribs.href
    }
  })
  return returnLink
}
