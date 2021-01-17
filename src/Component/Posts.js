import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CommentsScreen from "./Comments";

const PostsScreen = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);

  if (redirect) {
    return <CommentsScreen post={selectedPost} />;
  }

  return (
    <React.Fragment>
      <div
        style={{
          textAlign: "left",
          fontSize: "23px",
          marginTop: "25px",
          marginLeft: "35px",
        }}
      >
        Posts
      </div>
      {posts.map((post, index) => {
        return (
          <Card
            onClick={() => {
              setSelectedPost(post);
              setRedirect(true);
            }}
            key={index}
            style={{
              margin: "35px",
              textAlign: "left",
              padding: "3px",
            }}
          >
            <CardActionArea>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.body}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default PostsScreen;
