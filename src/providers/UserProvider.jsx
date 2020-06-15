import React, { createContext, Component } from "react";
import { createUserProfileDocument } from "../firebase";
import { auth } from "../firebase";

export const UserContext = createContext();

class UserProvider extends Component {
  state = { user: null };
  unsubscribeFromAuth = null;
  unsubscribeFromUserCollection = null;
  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      const userCollectionRef = await createUserProfileDocument(userAuth);
      if (userCollectionRef) {
        this.unsubscribeFromUserCollection = userCollectionRef.onSnapshot(
          (snapshot) => {
            this.setState({ user: { uid: snapshot.id, ...snapshot.data() } });
          }
        );
      } else {
        this.setState({ user: null });
      }
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  };

  render() {
    const { children } = this.props;
    const { user } = this.state;
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
  }
}

export default UserProvider;
