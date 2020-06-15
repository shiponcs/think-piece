import React from "react";
import { render } from "react-dom";
import "@firebase/firestore";
import "./index.scss";

import Application from "./components/Application";
import PostsProvider from "./providers/PostsProvider";
import UserProvider from "./providers/UserProvider";

import { BrowserRouter as Router } from "react-router-dom";

render(
  <Router>
    <PostsProvider>
      <UserProvider>
        <Application />
      </UserProvider>
    </PostsProvider>
  </Router>,
  document.getElementById("root")
);
