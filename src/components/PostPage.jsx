import React from "react";

import Post from "./Post";
import Comments from "./Comments";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

import { withRouter } from "react-router-dom";
import withUser from "./withUser";

class PostPage extends React.Component {
  state = { post: null, comments: [] };

  get postId() {
    return this.props.match.params.id;
  }
  get postRef() {
    return firestore.doc(`/posts/${this.postId}`);
  }
  get comementsRef() {
    return this.postRef.collection("comments");
  }

  unsubscribeFromPosts = null;
  unsubscribeFromComments = null;

  componentDidMount = async () => {
    this.unsubscribeFromPosts = this.postRef.onSnapshot((snapshot) => {
      const post = collectIdsAndDocs(snapshot);
      console.log(snapshot);
      this.setState({ post });
    });

    this.unsubscribeFromComments = this.comementsRef.onSnapshot((snapshot) => {
      const comments = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ comments });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromPosts();
    this.unsubscribeFromComments();
  };

  createComment = (comment) => {
    const { user } = this.props;
    this.comementsRef.add({
      ...comment,
      user,
    });
  };

  render() {
    const { post, comments } = this.state;
    console.log(this.props);
    return (
      <section>
        {post && <Post {...post} />}
        <Comments
          comments={comments}
          // postId={post.id}
          onCreate={this.createComment}
        />
      </section>
    );
  }
}

export default withUser(PostPage);
