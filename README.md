
# API-Login

This API has been developed for my front-end project called 'ToDoList'. However, if you're looking for an API to handle user registration/login, feel free to use it if you find it useful for building a to-do app. In a near future, I plan to deploy this API on Google Cloud or Heroku.

# Instructions to configurate the project
### Installation
To get started, clone the project repository, navigate to the app folder directory, and proceed to install the necessary dependencies.

Clone the project

```bash
  git clone https://github.com/MatheusGraciki/ApiLogin
```

Go to the project directory

```bash
  cd ApiLogin
```

Install dependencies

```bash
  npm install
```
    
### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_KEY`


### Demo of configuration  of the enviroment variables
Before you watch the video, you need create an account and Sign In in MongoDB: https://www.mongodb.com/pt-br

You also need follow the configuration of the video below

https://streamable.com/l657p8 The video quality may not be the best, but I think it is still sufficient to understand the process. However, I apologize for the low quality. 


# Run the project
After configurated the project

Go to the project directory

```bash
  cd ApiLogin
```

Start the server

```bash
  npm run start
```

Now you can test the project following the "API Reference"
## API Reference

#### Register

```http
  POST /auth/register
```

| Parameters | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Your username |
| `email` | `string` | **Required**. Your email |
| `password` | `string` | **Required**. Your password |


#### Login

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `usernameOrEmail`      | `string` | **Required**. An existing username or email  |
| `password`      | `string` | **Required**. your existing password |





## Roadmap

- Create  todo crud routes 
- Deploy the project
