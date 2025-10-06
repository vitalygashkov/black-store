import { _4pdaSource } from '../sources/4pda.js';
import { hasAppLink } from '../app-link.js';

// https://4pda.to/forum/index.php?showtopic=590411
const url =
  'https://4pda.to/forum/index.php?m=2373711&psb=oXRsb3NvbaCeoZ2dc21vcXFrbm1vcGtvbnSecJ1ycnI_&act=st_rss&st=590411';

const adapter = (post) => {
  const shouldAddPost = hasAppLink(post.description);
  if (!shouldAddPost) return null;
  const description = post.description.toLocaleLowerCase();
  const title = description.includes('сберинвестиции') ? 'СберИнвестиции' : 'Сбер';
  const link = post.description.split('href="')[1]?.split('"')[0];
  return { ...post, title, link };
};

export const sber4pda = _4pdaSource.from(url).with(adapter);
