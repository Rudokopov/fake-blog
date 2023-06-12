import React, { useEffect } from "react";
import Post from "../components/Post";
import { fetchPosts } from "../app/slices/slice";
import { useAppDispatch } from "../app/store";
import { selectPostData } from "../app/slices/selectors";
import { useSelector } from "react-redux";

const Main = () => {
  const dispatch = useAppDispatch();
  const { posts, status } = useSelector(selectPostData);

  const getPosts = async () => {
    const currentPage: number = 1;

    dispatch(fetchPosts({ currentPage }));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <section>
      <>
        {posts.map((post, i) => {
          return (
            <Post
              key={i}
              title={post.title}
              description={post.body}
              image="https://images.unsplash.com/photo-1675426513962-1db7e4c707c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
              commentsCount={2}
            />
          );
        })}
      </>
      {/* <Post
        title="Салют"
        description="Этот пост о чем то для проверки чего то"
        image="https://images.unsplash.com/photo-1675426513962-1db7e4c707c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
        commentsCount={2}
      /> */}
    </section>
  );
};

export default Main;
