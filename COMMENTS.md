# Dreadful Cherry Tomatoes 🍅

## 📚 Overview

In this technical challenge, I created a web app called Dreadful Cherry Tomatoes, a movie platform. It consists of a single page where users can check out information about popular movies. This document gives you a an overview of my implementation choices and important aspects of the application.

## 🖇️ API integration

To obtain movie data, I made a request to the provided file. I utilized _react-query_ to make the request and handling the response, as it provides an elegant and scalable way to manage state, errors, refetching, cache, etc.

## 📖 Pagination and sorting

For pagination, I took advantage of the usePagination hook from _@mantine/hooks_. It keeps track of the current page and calculates the appropiate range of pages to be displayed by the pagination control, enabling users to navigate through the movie list efficiently.

To ensure that the most recent movies appear at the top of the list, I implemented a sorting helper function.

## 🔍 Filtering by title

To provide users with the ability to filter movies by title, I implemented a search box. As users type in the search input, the movie list is dynamically updated to show only the movies whose titles match the entered text. This enhances the user experience by allowing them to quickly find movies of interest.

I also used another hook from _@mantine/hooks_ to debounce value changes in the input to help reduce excessive updates triggered by rapid user input.

## 💅 Styling

I used SCSS to manage the project's stylesheets. I kept base styles, design tokens and mixins in a central location, while modularizing the styles of each component, keeping each component's styles scoped and close to them, making it easy to understand and update.

## 🧪 Testing

To make sure everything works as expected, I used Jest and Testing Library for unit and integration tests (helper functions, custom hooks). I also used Playwright to implement E2E tests. These tests will ensure to maintain code quality in the future.
