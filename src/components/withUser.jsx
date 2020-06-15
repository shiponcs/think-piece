import React from "react";
import { UserContext } from "../providers/UserProvider";

const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || "MyComponent";
};

const withUser = (Component) => {
  const WrappedComponent = (props) => {
    return (
      <UserContext.Consumer>
        {(user) => <Component user={user} {...props} />}
      </UserContext.Consumer>
    );
  };

  WrappedComponent.displayName = `withUser(${getDisplayName(
    WrappedComponent
  )})`; // just for debugging purpose, it will give it a name

  return WrappedComponent;
};

export default withUser;
