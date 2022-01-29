import React, { useEffect, useLayoutEffect, useState } from "react";
import NavBar from ".//NavBar";
import Login from ".//Login";
import Footer from ".//Footer";
import { useStateValue } from "./StateProvider";
import MarketList from ".//MarketList";
import Logout from ".//Logout";
import Register from "./Register";
import { Routes, Route } from "react-router-dom";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";

const App = ({ isAuth, user }) => {
  // const [user, dispatch] = useStateValue();

  // dispatch({ type: actionTypes.SET_USER, user: user });

  // useEffect(() => {
  //   auth.onAuthStateChanged((authUser) => {
  //     console.log("onAuthStateChanged", authUser);

  //     localStorage.setItem("authUser", JSON.stringify(authUser));

  //     dispatch({
  //       type: actionTypes.SET_USER,
  //       user: JSON.parse(JSON.stringify(authUser)),
  //     });
  //     setIsLoading(false);
  //   });

  //   return () => {
  //     localStorage.removeItem("authUser");
  //     dispatch({ type: actionTypes.SET_USER, user: null });
  //   };
  // }, []);

  return (
    <>
      {
        <>
          <NavBar isAuth={isAuth}></NavBar>
          <Routes>
            <Route path="/" element={isAuth ? <MarketList /> : <Login />} />
            <Route path="logout" element={isAuth ? <Logout /> : ""} />
            <Route
              path="register"
              element={!isAuth ? <Register /> : <MarketList />}
            />
          </Routes>
          <Footer></Footer>
        </>
      }
    </>
  );
};

export default App;

// return (
//   <>

//     {isAuth ? (
//       <>
//         <NavBar></NavBar>
//         <Routes>
//           <Route path="/" element={isAuth ? <MarketList /> : <Login />} />
//           <Route path="logout" element={isAuth ? <Logout /> : ""} />
//           <Route path="register" element={!isAuth ? <Register /> : ""} />
//         </Routes>
//         <Footer></Footer>
//       </>
//     ) : (
//       <>
//         <NavBar></NavBar>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="register" element={<Register />} />
//         </Routes>
//         <Footer></Footer>
//       </>
//     )}
//   </>
// );
