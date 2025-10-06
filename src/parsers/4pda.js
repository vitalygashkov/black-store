import { DOMParser } from '@xmldom/xmldom';
import { fetch } from '../http.js';

export const fetchItems = async (url) => {
  const response = await fetch(url);
  const xmlString = await response.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, 'text/xml');
  const items = xml.getElementsByTagName('item');
  const results = [];
  for (const item of items) {
    const title = item.getElementsByTagName('title')[0]?.textContent;
    const description = item.getElementsByTagName('description')[0]?.textContent;
    const link = item.getElementsByTagName('link')[0]?.textContent;
    const pubDate = item.getElementsByTagName('pubDate')[0]?.textContent;
    results.push({ title, description, link, pubDate });
  }
  return results;
};
