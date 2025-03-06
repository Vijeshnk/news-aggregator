# News Aggregator

A responsive news aggregator application built with React, TypeScript, and Redux that pulls articles from multiple sources and displays them in a clean, user-friendly interface.

## Features

- **Article Search and Filtering**: Search for articles by keyword and filter results by date, category, and source
- **Personalized News Feed**: Customize your news feed by selecting preferred sources, categories, and authors
- **Mobile-Responsive Design**: Optimized for all device sizes
- **Multiple News Sources**: Integrates with NewsAPI, The Guardian, and New York Times
- **Docker Support**: Containerized application for easy deployment

## Technologies Used

- React with TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- Docker for containerization

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Vijeshnk/news-aggregator
   cd news-aggregator


## Docker Setup

This application can be easily run in a Docker container.

### Run with Docker

1. **Build and start the container**:

   ```bash
   # Build the Docker image
   npm run docker:build

   # Start the container
   npm run docker:start

   Access the application at http://localhost:8080
   Stop the container when finished:
   npm run docker:stop


   Note: Make sure your .env file contains the necessary API keys:

   VITE_NEWS_API_KEY=your_key_here
VITE_GUARDIAN_API_KEY=your_key_here
VITE_NYT_API_KEY=your_key_here