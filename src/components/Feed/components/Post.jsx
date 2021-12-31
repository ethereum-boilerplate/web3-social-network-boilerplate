import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery, useWeb3ExecuteFunction } from "react-moralis";
import { useEffect, useState, createElement } from "react";
import { Comment, Tooltip, message, Divider, Button } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import glStyles from "components/gstyles";
import Votes from "./Votes";
import AddComment from "./AddComment";
import Feed from "./FeedComment";
import Donate from "./Donate";
import ShowProfilePostName from "components/ShowProfilePostName";
import ShowProfilePostPic from "components/ShowProfilePostPic";

const Post = ({ post }) => {
  const [showAddComment, setShowAddComment] = useState(false);
  const { contentId, postId, postOwner } = post;
  const [postContent, setPosContent] = useState({
    title: "default",
    content: "default",
  });

  const { data } = useMoralisQuery("Contents", (query) =>
    query.equalTo("contentId", contentId)
  );
  const [voteStatus, setVoteStatus] = useState();
  const { data: votes } = useMoralisQuery(
    "Votes",
    (query) => query.equalTo("postId", postId),
    [],
    {
      live: true,
    }
  );

  const { walletAddress, contractABI, contractAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const contractProcessor = useWeb3ExecuteFunction();

  useEffect(() => {
    function extractUri(data) {
      const fetchedContent = JSON.parse(JSON.stringify(data, ["contentUri"]));
      const contentUri = fetchedContent[0]["contentUri"];
      return contentUri;
    }
    async function fetchIPFSDoc(ipfsHash) {
      console.log(ipfsHash);
      const url = ipfsHash;
      const response = await fetch(url);
      return await response.json();
    }
    async function processContent() {
      const content = await fetchIPFSDoc(extractUri(data));
      setPosContent(content);
    }
    if (data.length > 0) {
      processContent();
    }
  }, [data]);

  useEffect(() => {
    if (!votes?.length) return null;

    async function getPostVoteStatus() {
      const fetchedVotes = JSON.parse(JSON.stringify(votes));
      fetchedVotes.forEach(({ voter, up }) => {
        if (voter === walletAddress) setVoteStatus(up ? "liked" : "disliked");
      });
      return;
    }

    getPostVoteStatus();
  }, [votes, walletAddress]);

  function toggleShowAddComment() {
    setShowAddComment(!showAddComment);
  }

  async function vote(direction) {
    if (walletAddress.toLowerCase() === postOwner.toLowerCase())
      return message.error("You cannot vote on your posts");
    if (voteStatus) return message.error("Already voted");
    const options = {
      contractAddress: contractAddress,
      functionName: direction,
      abi: contractABIJson,
      params: {
        _postId: post["postId"],
        [direction === "voteDown" ? "_reputationTaken" : "_reputationAdded"]: 1,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => console.log("success"),
      onError: (error) => console.error(error),
    });
  }

  const actions = [
    <Button
      style={{
        marginTop: "10px",
        marginBottom: "10px",
      }}
      shape='round'
      onClick={toggleShowAddComment}
    >
      Reply
    </Button>,

    <Tooltip key='comment-basic-like' title='Vote Up'>
      <span
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          paddingRight: "5px",
          paddingLeft: "10px",
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          marginRight: "16px",
        }}
        onClick={() => vote("voteUp")}
      >
        {createElement(voteStatus === "liked" ? LikeFilled : LikeOutlined)} Vote
        Up
      </span>
    </Tooltip>,
    <span style={{ fontSize: "15px" }}>
      <Votes postId={postId} />
    </span>,
    <Tooltip key='comment-basic-dislike' title='Dislike'>
      <span
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          paddingRight: "5px",
          paddingLeft: "5px",
          marginRight: "50px",
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          marginLeft: "8px",
        }}
        onClick={() => vote("voteDown")}
      >
        {createElement(
          voteStatus === "disliked" ? DislikeFilled : DislikeOutlined
        )}{" "}
        Vote Down
      </span>
    </Tooltip>,

    <Feed
      style={{
        paddingLeft: "10px",
        fontSize: "15px",
        display: "inline-block",
        alignItems: "center",
        marginLeft: "8px",
      }}
      parentId={post.postId}
    />,
  ];

  const loading = "";

  const result = (
    <Comment
      style={{ ...glStyles.card, padding: "0px 15px", marginBottom: "10px" }}
      actions={actions}
      author={<ShowProfilePostName postOwner={post["postOwner"]} />}
      avatar={<ShowProfilePostPic postOwner={post["postOwner"]} />}
      content={
        <>
          <Text strong style={{ fontSize: "20px", color: "#333" }}>
            {postContent["title"]}
          </Text>
          <p style={{ fontSize: "15px", color: "#111" }}>
            {postContent["content"]}
          </p>
          {postContent["image"] !== undefined ? (
            <img
              src={postContent["image"]}
              alt='img'
              style={{
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                width: "50%",
              }}
            />
          ) : (
            ""
          )}
          <Divider style={{ margin: "15px 0" }} />
          <>{showAddComment ? <AddComment parentId={post.postId} /> : ""}</>
          <Donate postOwner={post.postOwner} postId={post.postId} />
        </>
      }
    />
  );
  return postContent["title"] === "default" ? loading : result;
};

export default Post;
