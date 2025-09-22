const { fetchItems } = require('../parsers/4pda');
const { hasAppLink } = require('../app-link');

const RSS_4PDA_TBANK =
  'https://4pda.to/forum/index.php?m=2373711&psb=cEM7PkI-PG9tcGxsQjw-QEA6PTw-Pzo-PUNtP2xBQUE_&act=st_rss&st=1064562';

const fetchLatestPosts = async () => {
  const items = await fetchItems(RSS_4PDA_TBANK);
  const posts = [];
  for (const item of items) {
    const shouldAddPost = hasAppLink(item.description);
    if (shouldAddPost) {
      const description = item.description.toLocaleLowerCase();
      const title = description.includes('инвестиции') ? 'Т-Инвестиции' : 'Т-Банк';
      const link = item.description.split('href="')[1]?.split('"')[0];
      const exists = posts.find((p) => p.link === link);
      if (exists) continue;
      posts.push({ author: item.title, title, link });
    }
  }
  return posts;
};

module.exports = { fetchLatestPosts };
