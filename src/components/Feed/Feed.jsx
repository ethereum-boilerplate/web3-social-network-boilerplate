import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useState } from "react";
import Posts from "./components/Posts";
import Reputation from "components/Reputation";
import { Button, Typography } from "antd";
import glStyles from "components/gstyles";
import AddPost from "./components/AddPost";

const Feed = () => {
  const { selectedCategory } = useMoralisDapp();
  const [showAddPost, setShowAddPost] = useState(false);
  const { Title, Paragraph } = Typography;
  let result = null;

  function toogleShowAddPost() {
    setShowAddPost(!showAddPost);
  }

  if (selectedCategory["category"] === "default") {
    result = (
      <div className='col-lg-9'>
        <div
          style={{
            ...glStyles.card,
            padding: "10px 13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography>
            <Paragraph>
              <p
                style={{
                  display: "block",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                <img
                  style={{ display: "inline-block", verticalAlign: "middle" }}
                  src={
                    "https://ipfs.moralis.io:2053/ipfs/QmTpzXzzkgB58EP1jhAGnSsnqT3cF6f9yETGVaZ4B7Upoq"
                  }
                  alt='Polytter'
                  width='200'
                  height='200'
                />
              </p>
              <Title level={3}>Wellcome to polytter,</Title>
              You can post and comment in different categories and also in your
              feed.
            </Paragraph>
            <Paragraph>
              There is a reputation mechanism in different categories which
              shows next to your avatar after edit your profile for first time.
            </Paragraph>
            <Paragraph>
              {" "}
              All data will be stored on moralis IPFS can be accessed from
              Polygon blockchain.
            </Paragraph>
            <Paragraph>
              {" "}
              The address you use is in danger of expose and anyone can donate
              your post and comments.
            </Paragraph>

            <Title level={5}>
              You can start your journey by choosing a catergory
            </Title>
          </Typography>
        </div>
      </div>
    );
  } else {
    result = (
      <div className='col-lg-9'>
        <div
          style={{
            ...glStyles.card,
            padding: "10px 13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h4>
            {" "}
            Your Reputation in {selectedCategory["category"]} is <Reputation />{" "}
          </h4>
          <Button shape='round' onClick={toogleShowAddPost}>
            Post
          </Button>
        </div>
        {showAddPost ? <AddPost /> : ""}
        <Posts />
      </div>
    );
  }

  return result;
};

export default Feed;
