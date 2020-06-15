import React, { Component } from "react";
import { firestore } from "../firebase";
import withUser from "./withUser";

class AddPost extends Component {
  state = { title: "", content: "" };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { title, content } = this.state;
    const { uid, displayName, email, photoURL } = this.props.user;
    const onCreate = (post) => {
      firestore.collection("posts").add(post);
    };

    const post = {
      title,
      content,
      user: {
        uid,
        displayName,
        email,
        photoURL,
      },
      favorites: 0,
      comments: 0,
      createdAt: new Date(), // firestore has this  property by default, you can remove this too
    };

    onCreate(post);

    this.setState({ title: "", content: "" });
  };

  render() {
    const { title, content } = this.state;
    console.log(this.props);
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

export default withUser(AddPost);
