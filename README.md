# ChickCheck Backend API

## Contents
- [Link PPT](https://www.canva.com/design/DAGGrCSx6W4/zPrTKTjHW3bw59TUGW3SZQ/edit?utm_content=DAGGrCSx6W4&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)
- [Features](#features)
- [Diagram Environment](#Google-Cloud-Platform-Environment)
- [Installation](#installation)
- [Endpoint Route](#endpoint-route)
- [Endpoint Docs](#endpoint-docs)

## Descripttion
We aim to develop a backend API for Mobile Development. Ensuring API endpoint to give responses and retrieve request from android. Also integration with Machine Learning model using Tensorflow JS.

## Features
- Authentication with JWT (jsonwebtoken)
- Integrating with Tensorflow JS
- Histories Scan result
- Articles

## Google Cloud Platform Environment
![diagram env][internal-source]

[internal-source]: src/images/ChickCheck%20Environment.png 'GCP Environment'

## Installation

Chickcheck requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies.

```sh
npm i
```

### Starting Server
If you want to start default
```sh
npm run start
```
If you want to start with nodemon
```sh
npm run dev
```

## Endpoint Route
| HTTP Method | Path | Desc | Section |
| ------ | ------ | ------ | ------ |
| GET | /api/ | Dashboard | Home |
| GET | /api/user | all users available | User |
| GET | /api/user/{id} | Retrieve user by id | User |
| POST | /api/register | User registration | User |
| POST | /api/login | Login authorization | Authentication |
| POST | /api/logout | Logout authorization | Authentication |
| GET | /api/profile | User profile | Authentication |
| GET | /api/scan | User scan image | Scan |
| POST | /api/scan | Process scanned image | Scan |
| GET | /api/scan/result | Result scanned image | Scan |
| GET | /api/article	| List all article | Article |
| GET | /api/article/{id} | Retrieve article by id | Article |
| POST | /api/article	| Store new article | Article |
| PUT | /api/article/{id} | Update article by id | Article |
| DELETE | /api/article/{id} | Delete article by id | Article |

# Endpoint Docs

## Table
- [Authentication](#authentication)
    - [Login](#Login)
    - [Logout](#Logout)
    - [Profile](#Profile)
- [User](#user)
    - [Register](#register)
    - [Get all user](#get-all-user-with-scan-history)
    - [Get user by ID](#get-user-by-id)
- [Scan](#scan)
    - [Predict Scan](#predict-scan)
    - [Get recent scanned](#get-recent-scanned)
- [Article](#article)
    - [Get all articles](#get-all-articles)
    - [Store article](#store-article)
    - [Get article by ID](#get-article-by-id)
    - [Update article](#update-article)
    - [Delete article](#delete-article)

---

## Authentication
- [Login](#login)
- [Logout](#logout)
- [Profile](#profile)

After you logged in to the application, you need to pass the authorization token in the header using `Authorization Bearer Token`
```
{
    "Authorization": "Bearer ${token}"
}
```

### Login
- Endpoint: `/api/login`
- Method: `POST`
- Request Payload:
```
{
    "email": "user@example.com",
    "password": "password123"
}
```
- Response:
    - Code: 200 OK
        ```
        {
            "status": "success",
            "message": "Login Successful!",
            "token": "JWT_TOKEN"
        }
        ```
    - Code: 400 Bad Request
        ```
        {
            "status": "fail",
            "message": "Email and password are required!"
        }
        ```
    - Code: 404 Not Found
        ```
        {
            "status": "fail",
            "message": "Email or Password incorrect!"
        }
        ```

### Logout
- Endpoint: `/api/logout`
- Method: `POST`
- Response:
    - Code: 200 OK
        ```
        {
            "status": "success",
            "message": "Logout Successful!"
        }
        ```

### Profile
- Endpoint: `/api/profile`
- Method: `GET`
- Response:
    - Code: 200 OK
        ```
        {
            "status": "success",
            "data": {
                "id": "FOrbc6nWbOGeTwKNiWnG",
                "name": "Test",
                "email": "test@bangkit.com",
                "username": "test",
                "scanHistory": [
                    {
                        "id": "mbRCzfh3KT9d7PePzakG",
                        "createdAt": "2024-06-20T04:53:00.069Z",
                        "imageUrl": "https://storage.googleapis.com/tensorflowjs-chickcheck-model/scan-result/healthy_c0bec91f-2755-49c2-b282-9c3653bca26f.jpg",
                        "title": "Healthy",
                        "results": "Result of the scan is Healthy",
                        "article": {}
                    }
                ]
            }
        }
        ```

## User
- [Register](#register)
- [Get all user](#get-all-user-with-scan-history)
- [Get user by ID](#get-user-by-id)

### Register
- Endpoint: `/api/register`
- Method: `POST`
- Request Payload:
```
{
    "name": "Test",
    "username": "test",
    "email": "test@bangkit.com",
    "password": "secret",
    "passwordConfirm": "secret"
}
```
- Response:
    - Code: 200 OK
        ```
        {
            "status": "success",
            "message": "User created successfully",
            "data": {
                "name": "Test",
                "username": "test",
                "email": "test@bangkit.com",
                "password": "$2a$10$SlH6Z.ygkDC2HTvLQCVhh.9a/ldxT4r/grkob3Fq/rYxiLXZ6fwXW"
            }
        }
        ```
    - Code: 401 Unauthorized (password doesn't match)
        ```
        {
            "status": "fail",
            "message": "Password does not match!"
        }
        ```
    - Code: 401 Unauthorized (request payload email is empty)
        ```
        {
            "status": "fail",
            "message": "Please provide a valid email!"
        }
        ```
    - Code: 401 Unauthorized (Username exist)
        ```
        {
            "status": "fail",
            "message": "User already exists!"
        }
        ```

### Get all user with scan history
- Endpoint: `/api/user`
- Method: `GET`
- Response:
    - Code: 200 OK
        ```
        {
            "status": "success",
            "messages": "All User Retrieved Successfully",
            "data": [
                {
                    "id": "FOrbc6nWbOGeTwKNiWnG",
                    "name": "Test",
                    "username": "test",
                    "email": "test@bangkit.com",
                    "scanHistory": [
                        {
                            "id": "mbRCzfh3KT9d7PePzakG",
                            "createdAt": "2024-06-20T04:53:00.069Z",
                            "imageUrl": "https://storage.googleapis.com/tensorflowjs-chickcheck-model/scan-result/healthy_c0bec91f-2755-49c2-b282-9c3653bca26f.jpg",
                            "title": "Healthy",
                            "results": "Result of the scan is Healthy"
                        }
                    ]
                },
                {
                    "id": "MUXLVbp6c0m4zvteUuNN",
                    "name": "iniuser",
                    "username": "iniuser",
                    "email": "iniuser@gmail.com",
                    "scanHistory": [
                        {
                            "id": "T3xBb75gdbMrvdPIHPtu",
                            "createdAt": "2024-06-17T22:42:18.676Z",
                            "imageUrl": "https://storage.googleapis.com/tensorflowjs-chickcheck-model/scan-result/healthy_f69dfb14-feed-4bc6-84ec-ec75e6dfb70f.jpg",
                            "title": "Healthy",
                            "results": "Result of the scan is Healthy"
                        }
                    ]
                }
            ]
        }
        ```
    - Code: 400 Bad Request
        ```
        {
            "error": "Error occurred while retrieving users"
        }
        ```

### Get user by ID
- Endpoint: `/api/user/{id}`
- Method: `GET`
- Response:
    - Code: 200 OK
        ```
        {
            "status": "success",
            "message": "User retrieved successfully",
            "data": {
                "id": "FOrbc6nWbOGeTwKNiWnG",
                "name": "Test",
                "email": "test@bangkit.com",
                "username": "test",
                "scanHistory": [
                    {
                        "id": "mbRCzfh3KT9d7PePzakG",
                        "createdAt": "2024-06-20T04:53:00.069Z",
                        "imageUrl": "https://storage.googleapis.com/tensorflowjs-chickcheck-model/scan-result/healthy_c0bec91f-2755-49c2-b282-9c3653bca26f.jpg",
                        "title": "Healthy",
                        "results": "Result of the scan is Healthy"
                    }
                ]
            }
        }
        ```
    - Code: 400 Bad Request
        ```
        {
            "error": "Error occurred while retrieving user details"
        }
        ```
    - Code: 404 Not Found
        ```
        {
            "status": "fail",
            "message": "User not found"
        }
        ```

## Scan
- [Predict Scan](#predict-scan)
- [Get recent scanned](#get-recent-scanned)

### Predict scan
- Endpoint: `/api/scan`
- Method: `POST`
- Request Payload:
```
{
    "image": Blob
}
```
- Response:
    - Code: 201 Created (Scan)
        ```
        {
            "status": "success",
            "message": "Model is predicted successfully",
            "data": {
                "title": "Healthy",
                "createdAt": "2024-06-20T12:14:02.552Z",
                "results": "Result of the scan is Healthy",
                "imageUrl": "https://storage.googleapis.com/tensorflowjs-chickcheck-model/scan-result/healthy_fda1fe15-f497-4e9e-b226-bc1bc3a8bc6d.jpg"
            },
            article: {}
        }
        ```
    - Code: 500 Internal Server Error (Scan)
        ```
        {
            "message": 'Terjadi kesalahan dalam melakukan prediksi',
        }
        ```
    - Code: 201 Created (Upload image)
        ```
        {
            "message": 'Image uploaded successfully.',
            "url": `https://storage.googleapis.com/tensorflowjs-chickcheck-model/scan-result/${name}.jpg`
        }
        ```
    - Code: 500 Internal Server Error (Upload image)
        ```
        {
            "message": 'Failed to upload image.',
        }
        ```

### Get recent scanned
- Endpoint: `/api/scan/recent`
- Method: `GET`
- Response:
    - Code: 200 OK
        ```
        {
            "message": "Fetched 10 latest scanned image",
            "data": [
                {
                    "id": "pL8wwn0FVc2fw3J1HuQc",
                    "createdAt": "2024-06-20T12:14:02.552Z",
                    "imageUrl": "https://storage.googleapis.com/tensorflowjs-chickcheck-model/scan-result/healthy_fda1fe15-f497-4e9e-b226-bc1bc3a8bc6d.jpg",
                    "title": "Healthy",
                    "results": "Result of the scan is Healthy",
                    "article": {}
                },
                {
                    "id": "mbRCzfh3KT9d7PePzakG",
                    "createdAt": "2024-06-20T04:53:00.069Z",
                    "imageUrl": "https://storage.googleapis.com/tensorflowjs-chickcheck-model/scan-result/healthy_c0bec91f-2755-49c2-b282-9c3653bca26f.jpg",
                    "title": "Healthy",
                    "results": "Result of the scan is Healthy",
                    "article": {}
                }
            ]
        }
        ```

## Article
- [Get all articles](#get-all-articles)
- [Store article](#store-article)
- [Get article by ID](#get-article-by-id)
- [Update article](#update-article)
- [Delete article](#delete-article)

### Get all articles
- Endpoint: `/api/article`
- Method: `GET`
- Response:
    - Code: 200 OK
        ```
        {
            "status": "success",
            "data": [
                {
                    "id": "CAREFFdkr43sBpWms0Vu",
                    "createdAt": "2024-06-10T08:25:15.112Z",
                    "sources": [
                        "https://bbvetwates.ditjenpkh.pertanian.go.id/index.php/article/mengenal-salmonellosis-pada-unggas",
                        "https://bbvetwates.ditjenpkh.pertanian.go.id/index.php/article/mengenal-salmonellosis-pada-unggas"
                    ],
                    "author": {
                        "name": "marki",
                        "id": "ajRbInLOvpO4YlZAvvgY"
                    },
                    "title": "Salmonellosis",
                    "tags": [
                        "Disease",
                        "Poultry"
                    ],
                    "updatedAt": "2024-06-12T02:19:53.244Z",
                    "content": ""
                },
                {
                    "id": "Li1Ic8YAFxEdLLppJ2U5",
                    "createdAt": "2024-06-12T04:25:31.487Z",
                    "sources": [
                        "https://tabloidsinartani.com/detail/indeks/ternak/21003-Ayam-Sehat-Dimulai-dari-Kandang",
                        "https://www.sumbermakanan.co.id/detail/artikel/26/yuk--kenali-ciri-ciri-ayam-sehat-dan-ayam-sakit",
                        "https://www.putraperkasa.co.id/blog/sumber-nutrisi-untuk-ayam/"
                    ],
                    "author": {
                        "name": "marki",
                        "id": "ajRbInLOvpO4YlZAvvgY"
                    },
                    "title": "Healthy",
                    "updatedAt": "2024-06-12T04:25:31.487Z",
                    "tags": [
                        "sehat, artikel"
                    ],
                    "content": ""
                },
            ]
        }
        ```

### Store article
- Endpoint: `/api/article`
- Method: `POST`
- Request Payload:
```
{
    "title": "New Kupu kupu",
    "tags": ["Insect"],
    "sources": [],
    "content": "Butterfly"
}
```
- Response:
    - Code: 201 Created
        ```
        {
            "status": "success",
            "message": "Article created successfully",
            "data": {
                "title": "New Kupu kupu",
                "author": {
                    "id": "FOrbc6nWbOGeTwKNiWnG",
                    "name": "Test"
                },
                "createdAt": "2024-06-20T12:54:52.981Z",
                "updatedAt": "2024-06-20T12:54:52.981Z",
                "tags": [
                    "Insect"
                ],
                "sources": [],
                "content": "Butterfly"
            }
        }
        ```
    - Code: 400 Unauthorized (Request payload empty)
        ```
        {
            "status": 'fail',
            "message": 'All fields are required'
        }
        ```
    - Code: 400 Unauthorized (Tags empty)
        ```
        {
            "status": 'fail',
            "message": 'Tags are required'
        }
        ```

### Get article by ID
- Endpoint: `/api/article/{id}`
- Method: `GET`
- Response:
    - Code: 200 OK
        ```
        {
            "status": "success",
            "data": {
                "id": "A6nbuUnYCd2ZrdVxmzZJ",
                "createdAt": "2024-06-20T12:54:52.981Z",
                "sources": [],
                "author": {
                    "name": "Test",
                    "id": "FOrbc6nWbOGeTwKNiWnG"
                },
                "title": "New Kupu kupu",
                "content": "Butterfly",
                "updatedAt": "2024-06-20T12:54:52.981Z",
                "tags": [
                    "Insect"
                ]
            }
        }
        ```
    - Code: 404 Not Found
        ```
        {
            "status": 'fail',
            "message": 'Article not found'
        }
        ```

### Update article
- Endpoint: `/api/article/{id}`
- Method: `PUT`
- Request Payload:
```
{
    "title": "Kupu kupu",
    "tags": ["Insect", "Fly"],
    "sources": [],
    "content": "Butterfly Updated"
}
```
- Response:
    - Code: 201 Updated
        ```
        {
            "status": "success",
            "message": "Article updated successfully",
            "data": {
                "createdAt": "2024-06-20T12:54:52.981Z",
                "sources": [],
                "author": {
                    "name": "Test",
                    "id": "FOrbc6nWbOGeTwKNiWnG"
                },
                "title": "Kupu kupu",
                "content": "Butterfly Updated",
                "tags": [
                    "Insect",
                    "Fly"
                ],
                "updatedAt": "2024-06-20T13:12:53.797Z"
            }
        }
        ```
    - Code: 404 Not Found
        ```
        {
            "status": 'fail',
            "message": 'Article not found'
        }
        ```

### Delete article
- Endpoint: `/api/article/{id}`
- Method: `PUT`
- Response:
    - Code: 200 OK
        ```
        {
            "status": "success",
            "message": "Article deleted successfully"
        }
        ```
    - Code: 404 Not Found
        ```
        {
            "status": 'fail',
            "message": 'Article not found'
        }
        ```
