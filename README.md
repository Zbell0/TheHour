

```markdown
# News Website

This project is a news website that fetches and displays top headlines from various categories such as Business, Health, Science, Sports, and Technology.
 Users can also search for news articles by keywords. Additionally, the website includes a newsletter subscription feature where users can subscribe by entering their email addresses.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Key](#api-key)
- [Technologies Used](#technologies-used)

## Features

- Display top headlines from various categories
- Search for news articles by keywords
- Paginated news articles display
- Newsletter subscription form
- Responsive design

## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/your-repository-name.git
   cd your-repository-name
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Create a `.env` file in the root directory and add your News API key:**

   ```
   API_KEY=your_news_api_key
   ```

4. **Start the server:**

   ```sh
   npm start
   ```

   The server will be running on `http://localhost:3000`.

## Usage

- **Home Page:**
  - The home page displays the latest top headlines.
  - You can search for news articles using the search bar.
  - Click on category buttons to filter news by category.

- **Pagination:**
  - Use the pagination controls at the bottom of the page to navigate through different pages of news articles.

- **Newsletter Subscription:**
  - Enter your email address in the subscription form at the bottom of the page to subscribe to the newsletter.

## API Key

This project uses the News API to fetch news articles. You need to obtain an API key from [News API](https://newsapi.org/) and add it to your `.env` file as shown in the installation steps.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript
  - Bootstrap

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - SQLite
```

Replace the placeholder values such as `https://github.com/yourusername/your-repository-name.git` and `your_news_api_key` with the appropriate values for your project.

This `README.md` provides an overview of the project, instructions for installation and usage, information about the API key, and details on the technologies used in the project.
