# Newspaper Demo with Snowplow Signals Recommendations

This is a demo newspaper website that showcases how Snowplow Signals can be used for personalization.

## Features

- Homepage with featured articles, trending news, and personalized recommendations
- Article pages with content and related articles
- Category pages for browsing articles by topic
- Personalized article recommendations

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Snowplow Pipeline
- Snowplow event data structure `article_details` with string properties `category` and `name`
- Snowplow Signals

### Installation

1. Clone the repository
2. Copy the .env.example and populate
3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies Used

- Next.js 14
- React 18
- Tailwind CSS
- shadcn/ui components
- TypeScript