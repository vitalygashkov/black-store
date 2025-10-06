import { fetchItems } from '../parsers/4pda.js';
import { hasAppLink } from '../app-link.js';

const RSS_4PDA_SBER =
  'https://4pda.to/forum/index.php?m=2373711&psb=oXRsb3NvbaCeoZ2dc21vcXFrbm1vcGtvbnSecJ1ycnI_&act=st_rss&st=590411';

export const fetchLatestPosts = async () => {
  const items = await fetchItems(RSS_4PDA_SBER);
  const posts = [];
  for (const item of items) {
    const shouldAddPost = hasAppLink(item.description);
    if (shouldAddPost) {
      const title = item.description.includes('СберИнвестиции') ? 'СберИнвестиции' : 'Сбер';
      const link = item.description.split('href="')[1]?.split('"')[0];
      const exists = posts.find((p) => p.link === link);
      if (exists) continue;
      posts.push({ author: item.title, title, link });
    }
  }
  return posts;
};
