import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "../reducer";
import { auth } from "../firebase";
import App from "./App";

//HOF for checcking whether user is authenticated
//in order to display correct routes

const WithAuth = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [user, dispatch] = useStateValue({
    type: actionTypes.SET_USER,
    user: JSON.parse(localStorage.getItem("authUser")),
  });

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("onAuthStateChanged", authUser);
      localStorage.setItem("authUser", JSON.stringify(authUser));
      dispatch({
        type: actionTypes.SET_USER,
        user: JSON.parse(JSON.stringify(authUser)),
      });
    });
  }, []);

  return (
    <>
      {JSON.parse(localStorage.getItem("authUser")) !== null ? (
        <App isAuth={true} user={user.user} />
      ) : (
        <App isAuth={false} />
      )}
    </>
  );
};

export default WithAuth;

// return (
//     <>
//       {!isLoading ? (
//         <App isAuth={true} user={user.user} />
//       ) : (
//         <App isAuth={false} user={user.user} />
//       )}
//     </>
//   );
// };
