const { setTimeout: sleep } = require('node:timers/promises');
const { EventEmitter } = require('node:events');
const { getPosts } = require('./pepper');

class Feed extends EventEmitter {
  constructor() {
    super();
    this.feed = [];
  }

  async watch(interval = 1 * 60 * 1000) {
    while (true) {
      const isInit = this.feed.length === 0;
      const posts = await getPosts();
      for (const post of posts) {
        const existingPost = this.feed.find((p) => p.id === post.id);
        if (existingPost) continue;
        this.feed.push(post);
        if (isInit) continue; // Notify about new posts only after initialization
        this.emit('post', post);
      }
      await sleep(interval);
    }
  }
}

module.exports = { Feed };
