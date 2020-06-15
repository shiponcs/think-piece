import React, { Component } from "react";
import { auth, firestore, storage } from "../firebase";
import UpdateNotification from "./UpdatedNotification";

class UserProfile extends Component {
  state = { displayName: "", updated: false };
  imageInput = null;

  get uid() {
    return auth.currentUser.uid;
  }

  get userRef() {
    return firestore.doc(`users/${this.uid}`);
  }

  get file() {
    return this.imageInput && this.imageInput.files[0];
  }

  handleChnage = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { displayName } = this.state;

    if (displayName) {
      const DisplayNameUpdate = this.userRef.update({ displayName });
      DisplayNameUpdate.then(() => {
        this.setState(
          () => {
            return { updated: true };
          },
          () => setTimeout(() => this.setState({ updated: false }), 2000)
        );
      });
    }

    if (this.file) {
      console.log("######################", this.file);
      storage
        .ref()
        .child("user-profiles")
        .child(this.uid)
        .child(this.file.name)
        .put(this.file)
        .then((response) => {
          console.log("*********");
          return response.ref.getDownloadURL();
        })
        .then((photoURL) => this.userRef.update({ photoURL }));
    }
  };

  render() {
    const { displayName, updated } = this.state;
    console.log("UPDATED", updated);
    return (
      <section className="UserProfile">
        {updated ? <UpdateNotification>Updated!</UpdateNotification> : null}
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={displayName}
            name="displayName"
            onChange={this.handleChnage}
            placeholder="Display Name"
          />

          <input
            type="file"
            ref={(ref) => (this.imageInput = ref)}
            accept="image/png, image/jpeg"
          />
          <input type="submit" className="update" />
        </form>
      </section>
    );
  }
}

export default UserProfile;
