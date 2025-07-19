const { gotScraping } = require('got-scraping');

const parseAppName = (text) => {};

const parseAuthor = (commentStructure) => {
  const args = commentStructure.split('openProfileTooltip(')[1]?.split(')')[0];
  const [postId, username] = args
    .replaceAll(`'`, '')
    .split(',')
    .map((arg) => arg.trim());
  return { postId, username };
};

const parseMessage = (commentStructure) => {
  const commentContent = commentStructure
    .split('<!-- comment content -->')[1]
    ?.split('<!-- comment content end -->')[0]
    ?.trim();

  let body = commentContent.split('"parent_comment')[1]?.split('</div>')[0] ?? '';
  body = body.replaceAll('<br>', '\n');
  body = body.split('>')?.slice(1).join('>') ?? '';
  body = body.replaceAll('<p>', '');
  body = body.replaceAll('</p>', '');
  body = body.trim();

  for (const linkPart of body.split('<a')) {
    if (!linkPart.includes('</a>')) continue;
    const a = `<a${linkPart.split('</a>')[0]}</a>`;
    const href = a.split('href="')[1]?.split('"')[0];
    const link = linkPart.split('>')[1]?.split('</a')[0];
    body = body.replaceAll(a, link.includes('...') ? href : link);
  }

  const img = body.split('<img')[1]?.split('>')[0];
  const imgTag = `<img${img}>`;
  body = body.replaceAll(imgTag, '');

  return body;
};

const getPosts = async () => {
  const response = await gotScraping.get(
    'https://www.pepper.ru/discussions/spisok-vsex-klonov-prilozenii-dostupnyx-v-app-store-357097?sort_by=desc#comments',
    { http2: true }
  );

  let partWithComments = response.body.split('<div id="comment-list">')[1]?.split('Написать комментарий')[0];
  if (!partWithComments) return [];
  const writeCommentStart = partWithComments.lastIndexOf('<a onclick="openLogin()"');
  partWithComments = partWithComments.substring(0, writeCommentStart).replaceAll(' openLogin() ', '"openLogin()"');

  const parts = partWithComments.split('<!-- comment structure -->');

  const posts = [];

  for (const part of parts) {
    if (!part.includes('add_post')) continue;
    const commentStructure = part.split('<!-- comment structure End -->')[0]?.trim();
    const { postId, username } = parseAuthor(commentStructure);
    const message = parseMessage(commentStructure);
    const post = { id: postId, author: username, message };
    posts.push(post);
  }

  return posts.filter((post) => post.message.includes('apps.apple.com'));
};

module.exports = { getPosts };
