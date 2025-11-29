import { setTimeout as sleep } from 'timers/promises';
import { EventEmitter } from 'node:events';
import { dateNow } from './util.js';

// Refresh all feed sources (every 2 hours by default)
const getRefreshInterval = () => (process.env.REFRESH_INTERVAL_MINUTES ?? 120) * 60 * 1000;

// Delay between requests to each source (10-20 minutes by default)
const getThrottlingDelay = () => (1 + Math.random()) * (process.env.THROTTLING_MINUTES ?? 10) * 60 * 1000;

export class Feed extends EventEmitter {
  constructor(sources = []) {
    super();
    this.feed = [];
    this.sources = sources;
  }

  async addSource(source) {
    this.sources.push(source);
  }

  async refresh({ skipEmit = false } = {}) {
    console.log(`[${dateNow()}] Refreshing feed...`);

    if (!this.sources.length) {
      console.log(`[${dateNow()}] No sources added to feed`);
      return;
    }

    for (const source of this.sources) {
      console.log(`[${dateNow()}] Fetching posts from ${source.url}`);
      const posts = await source.fetchPosts();
      console.log(`[${dateNow()}] Found ${posts.length} posts`);

      for (const post of posts) {
        const existing = this.feed.find((p) => p.link === post.link);
        if (existing) {
          console.log(`[${dateNow()}] Post already exists in feed: ${post.link}`);
          continue;
        }
        console.log(`[${dateNow()}] [${post.author}] ${post.title}: ${post.link}`);
        this.feed.push(post);
        if (skipEmit) continue;
        this.emit('update', post);
        await this.onUpdate?.(post);
      }

      const delay = getThrottlingDelay();
      console.log(`[${dateNow()}] Waiting for ${Math.round(delay / 1000)}s before parsing next source...`);
      await sleep(delay);
    }
  }

  async watch({ interval = getRefreshInterval() } = {}) {
    const isInit = this.feed.length === 0;
    await this.refresh({ skipEmit: isInit }); // Notify about new updates only after initialization
    return setInterval(async () => {
      await this.refresh();
    }, interval);
  }
}
