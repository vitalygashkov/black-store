import { _4pdaSource } from '../sources/4pda.js';
import { hasAppLink } from '../app-link.js';
import { parseAppName } from '../app-name.js';

// https://4pda.to/forum/index.php?showtopic=590411
const url =
  'https://4pda.to/forum/index.php?m=2373711&psb=oXRsb3NvbaCeoZ2dc21vcXFrbm1vcGtvbnSecJ1ycnI_&act=st_rss&st=590411';

const adapter = (post) => {
  const shouldAddPost = hasAppLink(post.description);
  if (!shouldAddPost) return null;
  const description = post.description.toLocaleLowerCase();
  const title = parseAppName(description) ?? 'Сбер';
  const link = post.description
    .split('href="')
    .find((s) => s.includes('apps.apple.com') || s.includes('testflight.apple.com'))
    ?.split('"')[0];
  return { ...post, title, link };
};

export const sber4pda = new _4pdaSource(url).with(adapter);
