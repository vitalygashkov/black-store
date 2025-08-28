const { DOMParser } = require('@xmldom/xmldom');
const { Impit } = require('impit');

const impit = new Impit({
  browser: 'chrome',
  ignoreTlsErrors: true,
});

const fetchItems = async (url) => {
  const response = await impit.fetch(url);
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

module.exports = { fetchItems };
