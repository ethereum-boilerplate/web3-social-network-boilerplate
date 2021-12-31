import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery } from "react-moralis";
import Post from "./Post";

const Posts = () => {
  const { selectedCategory } = useMoralisDapp();
  const queryPost = useMoralisQuery(
    "Posts",
    (query) =>
      query
        .equalTo("categoryId", selectedCategory["categoryId"])
        .equalTo(
          "parentId",
          "0x9100000000000000000000000000000000000000000000000000000000000000"
        ),
    [selectedCategory],
    { live: true }
  );

  const fetchedPosts = JSON.parse(
    JSON.stringify(queryPost.data, ["postId", "contentId", "postOwner"])
  ).reverse();
  const havePosts = fetchedPosts.length > 0 ? true : false;

  const emptyResult = (
    <div>
      <h3>Be the first to post here for</h3>
      <h3>{selectedCategory["category"]} </h3>
    </div>
  );

  const postResult = (
    <div>
      {fetchedPosts.map((post) => (
        <Post key={post["postId"]} post={post} />
      ))}
    </div>
  );

  return havePosts ? postResult : emptyResult;
};

export default Posts;
