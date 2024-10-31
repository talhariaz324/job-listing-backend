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
npm install
```

### 4. Running the Project

```bash
npm run dev
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
