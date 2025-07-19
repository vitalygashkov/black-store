const { setTimeout: sleep } = require('node:timers/promises');
const { EventEmitter } = require('node:events');
const { getPosts } = require('./parsers/pepper');
const { dateNow } = require('./util');

class Feed extends EventEmitter {
  constructor() {
    super();
    this.feed = [];
  }

  async watch(interval = 60 * 1 * 60 * 1000) {
    while (true) {
      const isInit = this.feed.length === 0;
      console.log(`[${dateNow()}] Fetching posts...`);
      const posts = await getPosts();
      for (const post of posts) {
        const existingPost = this.feed.find((p) => p.id === post.id);
        if (existingPost) continue;
        this.feed.push(post);
        if (isInit) continue; // Notify about new posts only after initialization
        console.log(`[${dateNow()}] New post #${post.id} from ${post.author}`);
        this.emit('post', post);
      }
      await sleep(interval);
    }
  }
}

module.exports = { Feed };
