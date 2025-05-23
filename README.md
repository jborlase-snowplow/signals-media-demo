# Newspaper Demo with Snowplow Analytics

This is a demo newspaper website that showcases how Snowplow Analytics can be used for personalization and tracking in a media website.

## Features

- Homepage with featured articles, trending news, and personalized recommendations
- Article pages with content and related articles
- Category pages for browsing articles by topic
- Live reader count simulation
- Personalized article recommendations
- Snowplow tracking integration with debug panel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Start the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Snowplow Integration

This demo includes a simulated Snowplow tracking implementation that logs events to the console instead of sending them to a real collector. In a production environment, you would:

1. Replace the mock implementation in `lib/snowplow.ts` with the actual Snowplow Browser Tracker
2. Configure the collector endpoint in `.env.local`
3. Set up a real Snowplow pipeline to process the events

## Project Structure

- `app/` - Next.js app router pages and layouts
- `components/` - React components
  - `ui/` - UI components from shadcn/ui
- `lib/` - Utility functions and data
- `public/` - Static assets

## Technologies Used

- Next.js 14
- React 18
- Tailwind CSS
- shadcn/ui components
- TypeScript
\`\`\`

```gitignore file=".gitignore"
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js
.yarn/install-state.gz

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
