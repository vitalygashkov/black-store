import { _4pdaSource } from '../sources/4pda.js';
import { hasAppLink } from '../app-link.js';

// https://4pda.to/forum/index.php?showtopic=1064562
const url =
  'https://4pda.to/forum/index.php?m=2373711&psb=cEM7PkI-PG9tcGxsQjw-QEA6PTw-Pzo-PUNtP2xBQUE_&act=st_rss&st=1064562';

const adapter = (post) => {
  const shouldAddPost = hasAppLink(post.description);
  if (!shouldAddPost) return null;
  const description = post.description.toLocaleLowerCase();
  const title = description.includes('инвестиции') ? 'Т-Инвестиции' : 'Т-Банк';
  const link = post.description.split('href="')[1]?.split('"')[0];
  return { ...post, title, link };
};

export const tbank4pda = new _4pdaSource(url).with(adapter);
