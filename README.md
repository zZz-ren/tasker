# Tasker

Tasker is a task management application designed to streamline personal and team-based task tracking. It includes Google authentication, team collaboration features, and insightful dashboard analytics.

## Features

### Authentication

- Google Sign-In for secure user authentication.

### Team Management

- Create teams.
- Update team details.

### Task Management

- Create, update, and delete tasks.
- Mark tasks as **Completed** or **Pending**.

### Dashboard

The dashboard provides insights into task and user performance:

- **Task Status**: Pie chart visualization of tasks based on status.
- **Task Points**: Bar chart showing earned task points.
- **Most Tasks**: Bar chart highlighting users with the most tasks.
- **Most Productive Team of a User**: Radial chart displaying the user's most productive team.

## Installation

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (for database storage)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/zZz-ren/tasker.git
   cd tasker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```sh
   npm run dev
   ```

## Usage

- Sign in using Google authentication.
- Create or join teams.
- Manage tasks by adding, updating, and changing their status.
- View analytics on the dashboard.

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-branch
   ```
3. Commit your changes:
   ```sh
   git commit -m "Added new feature"
   ```
4. Push to your branch:
   ```sh
   git push origin feature-branch
   ```
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or suggestions, feel free to reach out or create an issue on GitHub.

---

Enjoy using **Tasker**! 🚀
