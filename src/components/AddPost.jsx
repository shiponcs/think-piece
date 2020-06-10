import React, { Component } from "react";
import { firestore } from "../firebase";

class AddPost extends Component {
  state = { title: "", content: "" };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, content } = this.state;
    const onCreate = (post) => {
      firestore.collection("posts").add(post);
    };

    const post = {
      title,
      content,
      user: {
        uid: "1111",
        displayName: "Abdul Matin",
        email: "xyz@gmail.com",
        photoURL: "http://placekitten.com/g/200/200",
      },
      favorites: 0,
      comments: 0,
      // createdAt: new Date(), // firestore has property by default
    };

    onCreate(post);

    this.setState({ title: "", content: "" });
  };

  render() {
    const { title, content } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="AddPost">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="content"
          placeholder="Body"
          value={content}
          onChange={this.handleChange}
        />
        <input className="create" type="submit" value="Create Post" />
      </form>
    );
  }
}

export default AddPost;
