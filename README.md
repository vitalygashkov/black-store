# App Sneak

App Sneak is a service for web scraping information about the latest updates of **Russian sanctioned iOS apps**.

The service has integration with **Telegram**: a **bot** for sending notifications to the specified Telegram channel.

## Quick start

- Install [Node.js](https://nodejs.org/en/download/)
- Install project dependencies: `npm i`

### Development

- Copy `.env.example` to `.env.local` and fill in the required environment variables
- Run the bot: `npm run dev`

### Production

Set environment variables on your server ([example for Dokploy](https://docs.dokploy.com/docs/core/variables)) where the bot will be running.

- Run the bot: `npm start`
