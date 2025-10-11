import { DOMParser } from '@xmldom/xmldom';
import { fetch } from '../http.js';
import { Source } from '../source.js';

export class _4pdaSource extends Source {
  constructor(url) {
    super(url);
  }

  async fetchPosts() {
    const response = await fetch(this.url);
    const xmlString = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlString, 'text/xml');
    const items = xml.getElementsByTagName('item');
    const posts = [];
    for (const item of items) {
      const title = item.getElementsByTagName('title')[0]?.textContent;
      const description = item.getElementsByTagName('description')[0]?.textContent;
      const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent;
      const link = item.getElementsByTagName('link')[0]?.textContent;
      const publishedAt = new Date(pubDate);
      const post = { author: title, description, link, publishedAt };
      const index = posts.length - 1;
      const transformed = this.adapter(post, index, posts);
      if (!transformed) continue;
      const exists = posts.find((p) => p.link === transformed.link);
      if (exists) continue;
      posts.push(transformed);
    }
    return posts;
  }
}
