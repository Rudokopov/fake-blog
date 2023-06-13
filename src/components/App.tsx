import React, { useEffect } from "react";
import styles from "./app.module.scss";
import Main from "../pages/Main";
import Header from "./Header";
import AboutUser from "./AboutUser";
import { userAvatar } from "../utils/consts";
import { Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        {/* <Header /> */}
        {/* <AboutUser avatar={userAvatar} username="Нина"></AboutUser> */}
        <Route path="/" element={<Main />} />
        <Route path="users/:id" element={<AboutUser />} />
      </Routes>
    </>
  );
};

export default App;
