import React, { useEffect } from "react";
import styles from "./app.module.scss";
import Main from "../pages/Main";
import Header from "./Header";
import AboutUser from "./AboutUser";
import { userAvatar } from "../utils/consts";

const App: React.FC = () => {
  return (
    <>
      <Header />
      {/* <AboutUser avatar={userAvatar} username="Нина"></AboutUser> */}
      <Main />
    </>
  );
};

export default App;
