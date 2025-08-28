const { EventEmitter } = require('node:events');
const { dateNow } = require('./util');
const sber = require('./apps/sber');
const { setTimeout: sleep } = require('timers/promises');

class Feed extends EventEmitter {
  constructor() {
    super();
    this.feed = [];
  }

  async refresh({ skipEmit = false } = {}) {
    console.log(`[${dateNow()}] Refreshing feed...`);
    const posts = [];

    const sberPosts = await sber.fetchLatestPosts();
    posts.push(...sberPosts);
    await sleep(1000);

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
