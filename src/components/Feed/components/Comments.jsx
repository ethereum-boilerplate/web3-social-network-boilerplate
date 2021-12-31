import { useMoralisQuery } from "react-moralis";
import Post from "./Post";

const Posts = (props) => {
  const queryPost = useMoralisQuery(
    "Posts",
    (query) => query.equalTo("parentId", props.parentId),
    [],
    { live: true }
  );

  const fetchedPosts = JSON.parse(
    JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])
  ).reverse();

  const postResult = (
    <div>
      {fetchedPosts.map((post) => (
        <Post key={post["postId"]} post={post} />
      ))}
    </div>
  );

  return postResult;
};

export default Posts;
