```sh
# My Screen Recorder Backend

This backend server is designed to handle screen recording uploads and integrate with WhisperAI for transcription.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   
2. Start the backend server:

   node app.js

```


# Video Upload Backend API Documentation

This repository contains the backend API for uploading and serving video files. The API provides two main endpoints:

## Base URL

The base URL for all API endpoints is `https://screen-recorder-j9t3.onrender.com`.

## Endpoints


## 1. Upload Video


### Endpoint

POST /upload


### Description

This endpoint allows you to upload a video file along with an initial ID. The video file will be saved on the server with a unique filename generated based on the provided ID.

### Request Body

- `id` (string): The initial ID for reference.
- `video` (file): The video file to be uploaded.

### Response

- **Status Code:** `200 OK`
- **Content:** JSON response containing details of the saved file, including `id`, `originalname`, `filename`, and `size`.

Example Response:
```json
{
  "message": "Video uploaded successfully",
  "file": {
    "id": "your-initial-id",
    "originalname": "original-video-filename.mp4",
    "filename": "your-initial-id-1632365288437-original-video-filename.mp4",
    "size": 1234567
  }
}
```
## 2. Get Video

### Endpoint

GET /video/:filename


### Description
This endpoint allows you to retrieve and serve a specific recorded video by its filename.

URL Parameters
- `filename` (string): The unique filename of the video you want to retrieve.


### Response
- **Status Code:** `200 OK` if the video is found and served.
- **Status Code:** `404 Not Found` if the video is not found.

- **Example**:
  ```http
  GET /video/filename_generated_in_upload_response
  ```
