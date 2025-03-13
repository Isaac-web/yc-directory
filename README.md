# YC Directory Clone

![image](https://github.com/user-attachments/assets/743416c0-6dfd-46b4-9d20-663d3f85c70e)


A modern web application built with Next.js that serves as a directory for YCombinator startups. This platform allows users to discover, share, and interact with YC-backed companies.

## 🚀 Features

- **Real-time Updates**: Built with Next.js 14 and Server Components
- **Authentication**: Secure user authentication system
- **Content Management**: Powered by Sanity.io headless CMS
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **Modern UI Components**: Using shadcn/ui components
- **TypeScript Support**: Full type safety across the application

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 19
- **Styling**: Tailwind CSS
- **CMS**: Sanity.io
- **Authentication**: NextAuth.js
- **Type Safety**: TypeScript
- **UI Components**: shadcn/ui, Radix UI
- **Markdown Support**: Markdown-it

## 🚦 Getting Started

### Prerequisites

- Node.js (Latest LTS version recommended)
- Yarn package manager
- Sanity.io account

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
NEXT_PUBLIC_SANITY_API_VERSION=your_api_version
SANITY_WRITE_TOKEN=your_sanity_write_token
```

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/yc-directory.git
cd yc-directory
```

2. Install dependencies:

```bash
yarn install
```

3. Start the development server:

```bash
yarn dev
```

4. Open http://localhost:3000 with your browser to see the result.:

5. For Sanity Studio:

```bash
	yarn sanity dev
```

## Project Structure

├── app/ # Next.js app directory
│ ├── (root)/ # Root layout and pages
│ ├── api/ # API routes
│ ├── studio/ # Sanity Studio integration
│ └── globals.css # Global styles
├── components/ # React components
│ ├── navbar/ # Navigation components
│ ├── startup-card/ # Startup display components
│ ├── startup-form/ # Startup creation/editing forms
│ ├── ui/ # Reusable UI components
│ └── user-startups/ # User-specific startup components
├── hooks/ # Custom React hooks
├── lib/ # Utility functions
│ ├── actions.ts # Server actions
│ ├── utils.ts # Helper functions
│ └── validator.ts # Form validation
├── public/ # Static assets
├── sanity/ # Sanity configuration
│ ├── lib/ # Sanity utility functions
│ ├── schemas/ # Content schemas
│ └── env.ts # Environment configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── next.config.ts # Next.js configuration

## 🔧 Configuration

### Tailwind CSS

The project uses a custom Tailwind configuration with:

- Custom color schemes
- Extended screen sizes
- Custom shadows
- Typography plugin
- Animation support

### Sanity Studio

Integrated Sanity Studio with:

- Custom document types for Authors and Startups
- Live preview capabilities
- Custom structure configuration

## 🚀 Deployment

The application is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables
4. Deploy!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch ( git checkout -b feature/AmazingFeature )
3. Commit your changes ( git commit -m 'Add some AmazingFeature' )
4. Push to the branch ( git push origin feature/AmazingFeature )
5. Open a Pull Request
