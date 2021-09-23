# Users Express API
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This repo is for a "Users" Express JS API used to create, view and delete user accounts.

## Specifics

This API has three routes, one `GET` and two `POST` based routes utilise firebase for reading, creating and deleting user information.

#### GET
- read - does what it says on the tin, returns all users from the firebase user database.

#### POST
- create - creates a user in the firebase database
- delete - deletes a specific user in the firebase database

## Examples

All requests requires a `SECRET_KEY` header.

All `GET` commands come pre-packaged so firing off a standard request to these will return an array of users.

`POST` requests require specific data in the request body, these include:
- `username` (required) the username of the user being created
- `password` (required for `/create`) the password being set for the user `username`
- `email` (required for `/create`) the email being set for the user `username`
