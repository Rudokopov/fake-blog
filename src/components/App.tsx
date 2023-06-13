import React, { useEffect, useState } from "react";
import styles from "./app.module.scss";
import Main from "../pages/Main";
import Header from "./Header";
import AboutUser from "./AboutUser";
import { userAvatar } from "../utils/consts";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPostData } from "../app/slices/post/selectors";
import { useAppDispatch } from "../app/store";
import { fetchPosts } from "../app/slices/post/slice";
import About from "../pages/About";
import GiftBox from "./GiftBox/GiftBox";
import Loaded from "./Loader/Loader";

const App: React.FC = () => {
  const { posts } = useSelector(selectPostData);
  const dispatch = useAppDispatch();
  const [customStatus, setCustomStatus] = useState<boolean>(false);

  const fakeLoading = () => {
    setCustomStatus(true);
    const timeout = setTimeout(() => {
      setCustomStatus(false);
    }, 500);

    return () => clearTimeout(timeout);
  };

  const getPosts = () => {
    fakeLoading();
    dispatch(fetchPosts());
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Header processedPosts={posts} />
      <Routes>
        <Route
          path="/"
          element={customStatus ? <Loaded /> : <Main processedPosts={posts} />}
        />
        <Route path="/users/:id" element={<AboutUser />} />
        <Route path="/wtf" element={<GiftBox />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
};

export default App;
