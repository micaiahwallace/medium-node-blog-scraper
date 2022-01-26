/**
 * Things to do:
 * 1. A function to extract blog posts (extractNodeBlogPostsArray):
 *  - takes the html string blog page from nodejs.org and performs logic to extract an array of blog posts using cheerio
 * 
 * 2. A function to load the data from the server (fetchUrlText):
 *  - takes a url and returns the string content from an http request
 * 
 * 3. A function that compares the stored posts list to the new posts:
 *  - compare previous and next post values to find new entries
 *  - return the array of new entries to be used to notify
 * 
 * 4.
 * 
 * 3. A function that controls all business logic as the imperative shell:
 *  - new_content = fetchUrlText(blog_url)
 *  - new_posts = extractNodeBlogPostsArray(new_content)
 *  - old_posts = getFromStore("posts")
 *  - posts_to_send = findPostsToSend(old_posts, new_posts)
 *  - sendPostNotifications(posts_to_send)
 */

/**
 * ListWatchNotifier -
 */

export interface BlogPost {
  time: string
  title: string
  summary: string
}