import { Impit } from 'impit';

export const impit = new Impit({
  browser: 'chrome',
  ignoreTlsErrors: true,
});

export const fetch = impit.fetch.bind(impit);
