import { _4pdaSource } from '../sources/4pda.js';
import { hasAppLink } from '../app-link.js';
import { parseAppName } from '../app-name.js';

// https://4pda.to/forum/index.php?showtopic=1046078
const url =
  'https://4pda.to/forum/index.php?m=2373711&psb=cEM7PkI-PG9tcGxsQjw-QEA6PTw-Pzo-PUNtP2xBQUE_&act=st_rss&st=1046078';

const adapter = (post) => {
  const shouldAddPost = hasAppLink(post.description);
  if (!shouldAddPost) return null;
  const title = parseAppName(post.description) ?? '';
  if (!title) console.log(post.description);
  const appStoreLink = post.description.split('href="https://apps.')[1]?.split('"')[0];
  const testflightLink = post.description.split('href="https://testflight.')[1]?.split('"')[0];
  const hasLink = appStoreLink || testflightLink;
  if (!hasLink) return null;
  const link = appStoreLink ? `https://apps.${appStoreLink}` : `https://testflight.${testflightLink}`;
  return { ...post, title, link };
};

export const sanctioned4pda = new _4pdaSource(url).with(adapter);
