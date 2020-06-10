import React, { Component } from "react";
import { firestore } from "../firebase";
import Posts from "./Posts";

class Application extends Component {
  state = {
    posts: [],
  };
  unsubscribe = null;
  componentDidMount = () => {
    this.unsubscribe = firestore.collection("posts").onSnapshot((snapshot) => {
      const posts = snapshot.docs.map((docs) => ({
        id: docs.id,
        ...docs.data(),
      }));
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
