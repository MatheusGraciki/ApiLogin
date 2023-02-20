
# API-ToDoList

This API has been developed for my front-end project called 'ToDoList'. However, if you're looking for an API to handle user registration/login, feel free to use it if you find it useful for building a to-do app. In a near future, I plan to deploy this API on Google Cloud or Heroku.

# Instructions to configurate the project
### Installation
To get started, clone the project repository, navigate to the app folder directory, and proceed to install the necessary dependencies.

```bash
    cd ApiToDoList
    npm install
```
    
### Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_KEY`



### Demo of configuration  of the enviroment variables
you also need follow the configuration of the video below

https://streamable.com/l657p8 
The video quality may not be the best, but it is still sufficient to understand the process. 

# Run the project
After configurated the project

```bash
    cd ApiToDoList
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



