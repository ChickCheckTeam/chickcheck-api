# ChickCheck Backend API

## Contents
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
- [Scan](#scan)
- [Article](#article)

## Authentication
- [Login](#login)
- [Logout](#logout)
- [Profile](#profile)

After you logged in to the application, you need to pass the authorization token in the header using `Authorization Bearer Token`

### Login
- **Endpoint**: `/login`
- **Method**: POST 

Mengautentikasi user dengan password dan email yang sudah didaftarkan.

### Logout
### Profile

## User
- [Register](#register)
- [Get all user](#get-all-user-with-scan-history)
- [Get user by ID](#get-user-by-id)

### Register
### Get all user with scan history
### Get user by ID

## Scan
- [Predict Scan](#predict-scan)
- [Get recent scanned](#get-recent-scanned)

### Predict scan
### Get recent scanned

## Article
- [Get all articles](#get-all-articles)
- [Store article](#store-article)
- [Get article by ID](#get-article-by-id)
- [Update article](#update-article)
- [Delete article](#delete-article)

### Get all articles
### Store article
### Get article by ID
### Update article
### Delete article