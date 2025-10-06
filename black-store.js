import { Bot, session } from 'grammy';
import { Feed } from './src/feed.js';
import { tbank4pda } from './src/apps/tbank.js';
import { sber4pda } from './src/apps/sber.js';
import { sanctioned4pda } from './src/apps/any.js';

async function main() {
  const bot = new Bot(process.env.TG_BOT_TOKEN);
  bot.use(session({ initial: () => ({}) }));
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

  const sendUpdateToChannel = async (update) => {
    const channelId = Number(process.env.TG_CHANNEL_ID);
    const hasMetadata = update.title && update.link;
    const text = hasMetadata ? `<b>${update.title}</b>\n${update.link}` : update.description;
    await bot.api.sendMessage(channelId, text, {
      parse_mode: 'HTML',
      link_preview_options: { is_disabled: true },
    });
  };

  const feed = new Feed([tbank4pda, sber4pda, sanctioned4pda]);
  feed.onUpdate = sendUpdateToChannel;
  feed.watch();
}

main();
