const { setTimeout: sleep } = require('timers/promises');
const { EventEmitter } = require('node:events');
const { dateNow } = require('./util');
const general = require('./apps/general');
const sber = require('./apps/sber');

class Feed extends EventEmitter {
  constructor() {
    super();
    this.feed = [];
  }

  async refresh({ skipEmit = false } = {}) {
    console.log(`[${dateNow()}] Refreshing feed...`);
    const posts = [];

    const generalPosts = await general.fetchLatestPosts();
    posts.push(...generalPosts);
    await sleep(5000);

    const sberPosts = await sber.fetchLatestPosts();
    posts.push(...sberPosts);
    await sleep(5000);

    // TODO: Extractors for other apps

    for (const post of posts) {
      const existingPost = this.feed.find((p) => p.link === post.link);
      if (existingPost) continue;
      this.feed.push(post);
      if (skipEmit) continue;
      console.log(`[${dateNow()}] ${post.author}: ${post.link}`);
      this.emit('post', post);
    }
  }

  // every 30 minutes
  async watch({ interval = 30 * 1 * 60 * 1000 } = {}) {
    return setInterval(async () => {
      const isInit = this.feed.length === 0;
      await this.refresh({ skipEmit: isInit }); // Notify about new posts only after initialization
    }, interval);
  }
}

module.exports = { Feed };
