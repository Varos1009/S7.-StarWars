# S7.Star Wars Ship Explorer

## Descripción

A React-based web application that allows users to explore Star Wars starships and their details. The application is built with modern web development practices and integrates with the Star Wars API to fetch and display data dynamically.

The project is structured to ensure maintainability, reusability, and scalability, adhering to modern best practices for React development.

## Features

### Level 1

1. Ship List Screen

- Displays a list of Star Wars starships with key details:
   - Name
   - Model

2. Ship Detail View

- Clicking on a starship in the list opens a detailed view.
- The detailed view includes all the information about the starship.

3. Load More Warehouses

- Implements a "View More" button to fetch additional ships from the API.
- API calls are managed through Context or Redux for centralized state management.

4. Modern Styling

- Styled to resemble the official Star Wars website for a polished look.

5. Home Page & Navigation

- Includes a Welcome Home Page with a button to access the starship list.
- A top navigation bar provides easy access to the home page.

6. User Authentication

- Features Login and Registration screens:
  - Prevents duplicate email registration.
- Powered by Firebase for authentication.
- Styled in line with the Star Wars theme.

7.  Route Protection

- Protects the ship list and details routes for registered users only.
- Redirects unauthenticated users to the login screen.
- Automatically redirects users back to their intended destination after login.

### Level 2

8. Pilot Cards

- Displays pilot cards within the ship detail view.

9. Film Cards

- Displays film cards for movies in which the starship has appeared.



##  Used Technologies

- React: Frontend framework.
- React Router: Routing and navigation.
- Firebase: Authentication.
- CSS: Styling and layout.
- Context: State management.
- Star Wars API (SWAPI): Data source.




## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Varos1009/S7.-StarWars.git
   cd S7.-StarWars

2. Install dependencies:

   ```bash
   npm install

3. Start the development server:

   ```bash
   npm run dev