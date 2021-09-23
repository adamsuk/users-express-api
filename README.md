# Users Express API
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This repo is for a "Users" Express JS API used to create, view and delete user accounts.

## Specifics

This API has three routes, one `GET` and two `POST` based routes utilise firebase for reading, creating and deleting user information.

All requests requires a `SECRET_KEY` header.

All `GET` commands come pre-packaged so firing off a standard request to these will return an array of users.

`POST` requests require specific data in the request body, these include:
- `username` (required) the username of the user being created
- `password` (required for `/create`) the password being set for the user `username`
- `email` (required for `/create`) the email being set for the user `username`

#### GET
- read - does what it says on the tin, returns all users from the firebase user database.

#### POST
- create - creates a user in the firebase database
- delete - deletes a specific user in the firebase database

## Examples

The GET endpoint `/read` will provide all the users in the database with an output similar to:
```
{
    "users": {
        "boom!": {
            "createdAt": 1632434088385,
            "email": "hi_there@me.com",
            "password": "readytodelete",
            "username": "boom!"
        },
        "me": {
            "createdAt": 1632257325534,
            "email": "hi@me.com",
            "password": "erm",
            "username": "me"
        }
    }
}
```

Calling `/create` with the example data:
```
{
    "username": "boom!",
    "password": "readytodelete",
    "email": "hi_there@me.com"
}
```

will output
```
{
    "status": 201,
    "msg": "User created with username: boom!"
}
```

This can be deleted using the `/delete` endpoint with the following data:
```
{
    "username": "boom!"
}
```

if the user exists a deletion will be confirmed with:
```
{
    "status": 200,
    "msg": "User deleted with username: boom!"
}
```

if the user doesn't exist the following error will be produces:
```
{
    "status": 500,
    "msg": "Unable to find user with username: boom!"
}
```
