import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import PostsScreen from "./Posts";

const CommentsScreen = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [searchBy, setSearchBy] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`).then((res) => {
      setComments(res.data);
    });
  }, [filterText, post.id]);

  const filteredComments =
    searchBy &&
    comments.filter((item) => {
      return String(item[searchBy]).toLocaleLowerCase().includes(filterText);
    });

  const commentsToDisplay = filterText ? filteredComments : comments;

  if (redirect) {
    return <PostsScreen />;
  }

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          setRedirect(true);
        }}
        style={{
          position: "absolute",
          left: "36px",
          top: "15px",
        }}
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIosIcon />}
      >
        Back to Posts
      </Button>

      <div
        style={{
          position: "relative",
          textAlign: "left",
          top: "25px",
          fontSize: "23px",
          margin: "36px",
          border: "1px dotted",
          padding: "15px",
        }}
      >
        {post.title}
      </div>

      <FormControl
        style={{
          width: "200px",
          textAlign: "left",
        }}
        variant="outlined"
      >
        <InputLabel>Search By</InputLabel>
        <Select
          value={searchBy || ""}
          onChange={(e) => {
            setFilterText(null);
            setSearchBy(e.target.value);
          }}
          label="Search By"
        >
          <MenuItem value="name">Name</MenuItem>
          <MenuItem value="email">Email</MenuItem>
          <MenuItem value="body">Body</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        disabled={!searchBy}
        variant="outlined"
        style={{
          marginLeft: "10px",
          width: "200px",
        }}
      >
        <InputLabel>{searchBy && searchBy[0].toUpperCase() + searchBy.slice(1)}</InputLabel>
        <OutlinedInput
          type="text"
          value={filterText ? filterText[searchBy] : ""}
          onChange={(e) => {
            setFilterText(e.target.value);
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>
      {!commentsToDisplay.length && <div style={{ padding: "20px" }}>No Data Found</div>}
      {commentsToDisplay.map((item, index) => {
        return (
          <Card
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
                  {item.body}
                </Typography>
                <Typography color="textSecondary" variant="body2" component="h2">
                  Email: {item.email.toLocaleLowerCase()}
                </Typography>
                <Typography color="textSecondary" variant="body2" component="h2">
                  Name: {item.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        );
      })}
    </React.Fragment>
  );
};

export default CommentsScreen;
