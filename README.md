# JSON API Runner

## Project Overview

JSON API Runner is a web application that allows users to trigger various backend services by sending structured JSON input. The backend processes these requests asynchronously and returns the results to the user. The project demonstrates frontend-backend communication, dynamic UI, and modular backend logic.

## Features

- Client-side interface (UI) with:
  - API selector dropdown
  - Light/dark theme toggle
  - Button alignment toggle (left/right)
  - JSON input textarea (manual editing supported)
  - "Run" button to send requests
  - Results display with syntax highlighting (Prism.js)
- Backend services:
  - userService (getUserProfile, deleteUserProfile, getUserProfiles)
  - imageService (getImage, deleteImage, getImages)
  - mathService (getFibonacci)
- Central dispatcher for routing API calls
- Simple logger module for timestamped logging
- Modular, testable code structure

## Folder Structure

```
project-root/
│
├── backend/
│   ├── dispatcher.js          # central logic that processes the JSON input
│   ├── apis/
│   │   ├── userService.js     # user-related async functions
│   │   ├── imageService.js    # image-related async functions
│   │   └── mathService.js     # math-related async functions
│   └── logger.js              # logger module
│
├── frontend/
│   ├── index.html             # base HTML page
│   ├── style.css              # styling
│   └── main.js                # handles API calls and UI interactions
│
├── server.js                  # Express server
└── README.md                  # this file
```

## How to Run

### Prerequisites

- Node.js (v14 or newer recommended)
- npm (comes with Node.js)

### Steps

1. Clone the repository and navigate to the project folder:
   ```bash
   git clone <repo-url>
   cd json-api-runner
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   node server.js
   ```
4. Open your browser and go to:
   [http://localhost:3000]

## Sample JSON Inputs

Paste these into the textarea to test:

**Get user profile:**

```json
[
  {
    "service": "userService",
    "endpoint": "getUserProfile",
    "params": { "userId": 1 }
  }
]
```

**Get all users:**

```json
[{ "service": "userService", "endpoint": "getUserProfiles" }]
```

**Delete user:**

```json
[
  {
    "service": "userService",
    "endpoint": "deleteUserProfile",
    "params": { "userId": 2 }
  }
]
```

**Get image:**

```json
[{ "service": "imageService", "endpoint": "getImage", "params": { "id": 1 } }]
```

**Get Fibonacci numbers:**

```json
[
  {
    "service": "mathService",
    "endpoint": "getFibonacci",
    "params": { "n": 10 }
  }
]
```

## Version Control & Submission

- All code is version-controlled with Git.
- Please see commit history for meaningful commit messages.
- The project is hosted on a public GitHub repository.

## Author

_Nikolett Topolics_
