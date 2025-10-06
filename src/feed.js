import { setTimeout as sleep } from 'timers/promises';
import { EventEmitter } from 'node:events';
import { dateNow } from './util.js';
import * as general from './apps/general.js';
import * as sber from './apps/sber.js';
import * as tbank from './apps/tbank.js';

export class Feed extends EventEmitter {
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

    const tbankPosts = await tbank.fetchLatestPosts();
    posts.push(...tbankPosts);
    await sleep(5000);

    // TODO: Extractors for other apps

    for (const post of posts) {
      const existingPost = this.feed.find((p) => p.link === post.link);
      if (existingPost) continue;
      this.feed.push(post);
      if (skipEmit) continue;
      console.log(`[${dateNow()}] [${post.author}] ${post.title}: ${post.link}`);
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
