const { EventEmitter } = require('node:events');
const { getPosts } = require('./parsers/pepper');
const { dateNow } = require('./util');

class Feed extends EventEmitter {
  constructor() {
    super();
    this.feed = [];
  }

  // every 30 minutes
  async watch(interval = 30 * 1 * 60 * 1000) {
    return setInterval(async () => {
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
    }, interval);
  }
}

module.exports = { Feed };
