import React, { useState, useEffect } from "react";
import Amplify from "@aws-amplify/core";

import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";

import "./styles.css";

Amplify.configure({
  // API: {
  //   aws_appsync_graphqlEndpoint:
  //     "https://111.appsync-api.us-east-2.amazonaws.com/graphql",
  //   aws_appsync_region: "us-east-2",
  //   aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  //   graphql_headers: async () => ({
  //     Authorization: (await Auth.currentSession()).getIdToken().getJwtToken()
  //   })
  // },
  Auth: {
    // REQUIRED - Amazon Cognito Region
    region: "us-east-2",
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "us-east-2_xxx",
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "xxx"
  }
});

const Nav = ({ authState }) =>
  authState === AuthState.SignedIn ? (
    <div className="topnav">
      <h1>Cool App!</h1>
      <div>
        <AmplifySignOut />
      </div>
    </div>
  ) : (
    <div className="topnav">
      <h1>Cool App!</h1>
    </div>
  );

const App = () => {
  const [authState, setAuthState] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthUIStateChange((nextAuthState, authData) => {
      console.log(authData);
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return (
    <>
      <Nav authState={authState} />
      {authState === AuthState.SignedIn && user ? (
        <div>
          <p>Welcome {user.username}, authentication was successful!</p>
          <p>
            You can call your API and render it here, in a table for example.
          </p>
        </div>
      ) : (
        <AmplifyAuthenticator />
      )}
    </>
  );
};

export default App;
