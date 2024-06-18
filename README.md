# ChickCheck Backend API

## Contents
- [Features](#features)
- [Diagram Environment](#Google-Cloud-Platform-Environment)
- [Installation](#installation)

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

## Endpoint
| HTTP Method | Path | Desc | Section
| Dropbox | [plugins/dropbox/README.md][PlDb] |
| GitHub | [plugins/github/README.md][PlGh] |
| Google Drive | [plugins/googledrive/README.md][PlGd] |
| OneDrive | [plugins/onedrive/README.md][PlOd] |
| Medium | [plugins/medium/README.md][PlMe] |
| Google Analytics | [plugins/googleanalytics/README.md][PlGa] |

| GET | /api/ | Dashboard | Home
| GET | /api/user | all users available | User
| GET | /api/user/{id} | Retrieve user by id | User
| POST | /api/register | User registration | User
| POST | /api/login | Login authorization | Authentication
| POST | /api/logout | Logout authorization | Authentication
| GET | /api/scan | User scan image | Scan
| POST | /api/scan | Process scanned image | Scan
| GET | /api/scan/result | Result scanned image | Scan
| GET | /api/article	| List all article | Article
| GET | /api/article/{id} | Retrieve article by id | Article
| POST | /api/article	| Store new article | Article
| PUT | /api/article/{id} | Update article by id | Article
| DELETE | /api/article/{id} | Delete article by id | Article