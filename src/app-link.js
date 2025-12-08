export const hasAppLink = (text) => text.includes('apps.apple.com/') || text.includes('testflight.apple.com/');

export const getAppId = (link) => {
  const { pathname } = new URL(link);
  const param = pathname.split('/').find((p) => p.startsWith('id'));
  if (link.includes('testflight')) return pathname.split('/').at(2);
  return param?.replace('id', '');
};
