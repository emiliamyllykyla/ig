<p align="center">
  <img height="400" src="https://user-images.githubusercontent.com/63544185/135295025-e6da4f8f-d456-4eca-8b07-4bcfdbbcf1f6.png" />
</p>

<h1 align="center">:sparkles: Inspirationgram :sparkles: </h1>

🔗 [Visit Inspirationgram here!](https://inspirationgram-e66c2.web.app/)

<p>Inspirationgram is an Instagram inspired app where users can upload images with captions, view all content posted in the app, follow or unfollow other users and view their content in their feed.</p>

<h2>Firebase</h2>

These [Firebase](https://firebase.google.com/) services are used in this app:
* **Firebase Auth** is used to enable authentication with a Google account.
* **Firebase Hosting** is used for hosting the app. 
* **Cloud Firestore** is used to store data to posts and users collections.
* **Cloud Storage for Firebase** is used to store image files. 

<h2>Other technologies</h2>

* Written in [TypeScript](https://www.typescriptlang.org/) using [ReactJS](https://reactjs.org/)
* Bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* [React Redux](https://react-redux.js.org/) with [Redux Toolkit](https://redux-toolkit.js.org/) is used for state management. Reducers handle the following states: 
  * authentication (login and logout), 
  * users (get users from database), 
  * profile (create, update, follow), 
  * posts (get, add) and
  * images (upload, delete).

<h2>Run the app</h2>

* `npm start` in the project directory runs the app in the development mode.

