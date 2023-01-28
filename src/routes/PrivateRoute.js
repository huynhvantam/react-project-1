import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";
function PrivateRoute(props) {
  const { user } = useContext(UserContext);

  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>OH snap! You got an error!</Alert.Heading>
          <p>You don't have permisson to access this route</p>
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
}

export default PrivateRoute;
