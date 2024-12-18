# Job Management API with Unsplash Integration

This project enables users to create jobs to retrieve images from Unsplash. When an image is successfully retrieved, the job status is updated to "resolved"; if unsuccessful, the job remains "pending".

## Features

- Create jobs to fetch images from Unsplash.
- Jobs return an image URL if successful; otherwise, they remain pending.
- Uses a JSON file as the data store for job statuses.

## Requirements

- Node.js v14 or higher
- npm (Node Package Manager)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/talhariaz324/calo-backend.git
cd job-listing-backend
```

### 2. Create Environment File

Create a `.env` file in the root directory of the project based on the format provided in `env.sample`.

### 3. Install Dependencies

```bash
yarn install
```

### 4. Running the Project

```bash
yarn dev
```

## API Endpoints

### POST `/api/jobs`

- **Description**: Creates a new job to fetch a random image from Unsplash’s food category.
- **Response**:
  - On success, returns the job ID.

### GET `/api/jobs`

- **Description**: Retrieves a list of all jobs with their statuses.
- **Response**:
  ```json
  [
    {
      "id": "46760",
      "status": "pending"
    },
    {
      "id": "47924",
      "status": "pending"
    }
  ]
  ```

### GET `/api/jobs/:id`

- **Description**: Retrieves the status and result of a job by its ID.
- **Response**:
  ```json
  {
    "id": "1692819383457",
    "status": "resolved",
    "result": "https://unsplash.com/image-url"
  }
  ```

## Time Allocation

The following time allocations were made for the development of the backend components of the project:

- **Websockets and Internet Connection Management**: 
  - **Duration**: 2-3 hours
  - **Description**: Set up WebSocket server to handle real-time communication with clients, ensuring robust handling of connection events and potential disconnections using queue and retry mechanism.

- **Backend APIs and Persistent Data Storage**: 
  - **Duration**: 7-8 hours
  - **Description**: Developed RESTful APIs to manage job creation and retrieval, and implemented persistent data storage using JSON files to maintain job statuses and results.
