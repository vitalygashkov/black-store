import { fetchItems } from '../parsers/4pda.js';
import { hasAppLink } from '../app-link.js';
import { parseAppName } from '../app-name.js';

const RSS_4PDA_ALL =
  'https://4pda.to/forum/index.php?m=2373711&psb=cEM7PkI-PG9tcGxsQjw-QEA6PTw-Pzo-PUNtP2xBQUE_&act=st_rss&st=1046078';

export const fetchLatestPosts = async () => {
  const items = await fetchItems(RSS_4PDA_ALL);
  const posts = [];
  for (const item of items) {
    const shouldAddPost = hasAppLink(item.description);
    if (shouldAddPost) {
      const title = parseAppName(item.description);
      const appStoreLink = item.description.split('href="https://apps.')[1]?.split('"')[0];
      const testflightLink = item.description.split('href="https://testflight.')[1]?.split('"')[0];
      const link = appStoreLink ? `https://apps.${appStoreLink}` : `https://testflight.${testflightLink}`;
      const exists = posts.find((p) => p.link === link);
      if (exists) continue;
      if (!title) {
        console.log(item.description);
      }
      posts.push({ author: item.title, title, link });
    }
  }
  return posts;
};
