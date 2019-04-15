# Space X Explorer

## Motive for this project

Space X Explorer that show history of past rocket launches. Want to create a Client side only state management that create a user on the client cache including client side authentication.

![](spaceX-HD.gif)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quickstart

This project is running the latest `react` and `react-dom` `v16.8`
and using the latest React `Hooks`.

Apollo Client for state management, and interaction with GraphQL space x api

If you have not install `yarn` in you machine install yarn using `brew`
or for other methods https://yarnpkg.com/lang/en/docs/install/#mac-stable

### Note!

Add a `.env.local` in the root of the directory and add the follwoing variables

```
REACT_APP_SPACE_X_API="https://api.spacex.land/graphql/"
REACT_APP_SALT_ROUNDS="12"
REACT_APP_SECRET="s3cr3t"
REACT_APP_SECRET_2="s3cr3ttw0"
```

### `brew install yarn`

Run yarn to install the dependencies.

### git clone

### `yarn`

To start locally run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

## Checklist

1. Create a React project with React CRA.
2. Setup Apollo Client without Apollo Boost.
3. Setup antd’s component library to use.
4. Prepare 2 layouts, a public one (for login, etc), and a private one (for in-app protected routes)
5. Create a fake login page, use a cache/localstorage variable after logging in.
6. Remember to provide a logout button after logging in.
7. Using SpaceX’s GraphQL API, render a list of their rockets in a table.

```

```
