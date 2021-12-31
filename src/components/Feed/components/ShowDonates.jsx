import { useState, useEffect } from "react";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralis, useMoralisQuery } from "react-moralis";

const Donates = ({ postId }) => {
  const { Moralis } = useMoralis();
  const [postDonates, setpostDonates] = useState("0");
  const { contractABI, contractAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);

  const { data } = useMoralisQuery(
    "Donates",
    (query) => query.equalTo("postId", postId),
    [],
    { live: true }
  );
  const options = {
    contractAddress: contractAddress,
    functionName: "getPost",
    abi: contractABIJson,
    params: {
      _postId: postId,
    },
  };

  useEffect(() => {
    async function getPostDonates() {
      await Moralis.enableWeb3;
      const result = await Moralis.executeFunction(options);
      setpostDonates(result[3]);
    }
    getPostDonates();
  }, [data]);

  return <>{postDonates}</>;
};

export default Donates;
