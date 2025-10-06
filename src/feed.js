import { setTimeout as sleep } from 'timers/promises';
import { EventEmitter } from 'node:events';
import { dateNow } from './util.js';

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
    const updates = [];

    if (!this.sources.length) {
      console.log(`[${dateNow()}] No sources added to feed`);
      return;
    }

    for (const source of this.sources) {
      const posts = await source.fetchPosts();
      updates.push(...posts);
      await sleep(5000);
    }

    for (const update of updates) {
      const existing = this.feed.find((p) => p.link === update.link);
      if (existing) continue;
      this.feed.push(update);
      if (skipEmit) continue;
      console.log(`[${dateNow()}] [${update.author}] ${update.title}: ${update.link}`);
      this.emit('update', update);
      await this.onUpdate?.(update);
    }
  }

  async watch({ interval = 30 * 1 * 60 * 1000 /* every 30 minutes */ } = {}) {
    return setInterval(async () => {
      const isInit = this.feed.length === 0;
      await this.refresh({ skipEmit: isInit }); // Notify about new updates only after initialization
    }, interval);
  }
}
