import React from "react";
import Post from "../components/Post";

const Main = () => {
  return (
    <section>
      <Post
        title="Салют"
        description="Этот пост о чем то для проверки чего то"
        image="https://images.unsplash.com/photo-1675426513962-1db7e4c707c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
      />
    </section>
  );
};

export default Main;
