# calendar-full-stack
Calendar app with React, Express, MongoDB

## Structure
* `React-calendar` - Frontend React app.
* `build` - Static website created with the `build` script of `create-react-app`.
* `config` - Database configuration.
* `controllers` - Backend controllers for authorization and calendar API.
* `models` - Database schema and model.
* `server.js` - Startup file.

## Usage

### Dev server

1. Run `npm i` in the app root and in `React-calendar`;
2. Launch `server.js` in Node (`node server.js`);
3. Start the `create-react-app` dev server (`npm start` in the `React-calendar` dir);
4. The dev build is available at http://localhost:3000

### Deployment build

1. Run `npm i` in the app root and in `React-calendar`;
2. Build the static content for the React app with `npm run build`;
3. Start `server.js` in Node (`node server.js`);
4. The prod build is available at http://localhost:5000

## Access

The default events are set up for the following user: `admin`:`changeit`
