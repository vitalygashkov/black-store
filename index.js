const { Bot, session } = require('grammy');
const { Feed } = require('./feed');

const bot = new Bot(process.env.TG_BOT_TOKEN);

bot.use(session({ initial: () => ({}) }));

async function main() {
  bot
    .start({
      allowed_updates: [
        'message',
        'chat_member',
        'channel_post',
        'inline_query',
        'callback_query',
        'chat_join_request',
        'my_chat_member',
      ],
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });

  const feed = new Feed();

  feed.watch();

  feed.on('post', async (post) => {
    let text = '';
    if (post.appName && post.appLink) text += `<b>${post.appName}</b>\n${post.appLink}`;
    else text = `${post.message}`;
    await bot.api.sendMessage(Number(process.env.TG_CHANNEL_ID), text, { parse_mode: 'HTML' });
  });
}

main();
