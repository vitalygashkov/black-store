const { fetchItems } = require('../parsers/4pda');

const RSS_4PDA =
  'https://4pda.to/forum/index.php?m=2373711&psb=oXRsb3NvbaCeoZ2dc21vcXFrbm1vcGtvbnSecJ1ycnI_&act=st_rss&st=590411';

const fetchLatestPosts = async () => {
  const items = await fetchItems(RSS_4PDA);
  const posts = [];
  for (const item of items) {
    const isNewApp = item.description.includes('apps.apple.com');
    if (isNewApp) {
      const title = item.description.includes('СберИнвестиции') ? 'СберИнвестиции' : 'Сбер';
      const link = item.description.split('href="')[1]?.split('"')[0];
      const exists = posts.find((p) => p.link === link);
      if (exists) continue;
      posts.push({ author: item.title, title, link });
    }
  }
  return posts;
};

module.exports = { fetchLatestPosts };
