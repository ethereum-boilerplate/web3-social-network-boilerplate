import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import {
  useMoralis,
  useMoralisQuery,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { useEffect, useState } from "react";
import { Input, message } from "antd";

function Donate(props) {
  const { Moralis } = useMoralis();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [postDonates, setpostDonates] = useState("0");
  const [isPending, setIsPending] = useState(false);
  const { walletAddress, contractABI, contractAddress } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const contractProcessor = useWeb3ExecuteFunction();

  const { data } = useMoralisQuery(
    "Donates",
    (query) => query.equalTo("postId", props.postId),
    [],
    {
      live: true,
    }
  );
  const options = {
    contractAddress: contractAddress,
    functionName: "getPost",
    abi: contractABIJson,
    params: {
      _postId: props.postId,
    },
  };

  useEffect(() => {
    amount ? setTx({ amount }) : setTx();
  }, [amount]);

  useEffect(() => {
    async function getPostDonates() {
      await Moralis.enableWeb3;
      const result = await Moralis.executeFunction(options);
      setpostDonates(result[5]);
    }
    getPostDonates();
  }, [data]);

  async function DoDonate(donate) {
    if (walletAddress.toLowerCase() === props.postOwner.toLowerCase())
      return message.error("You cannot donate on your posts");

    const { amount } = tx;
    const options1 = {
      contractAddress: contractAddress,
      functionName: donate,
      abi: contractABIJson,
      params: {
        _postId: props.postId,
        _reputationAdded: amount,
      },
    };
    const options2 = {
      type: "native",
      amount: Moralis.Units.ETH(amount),
      receiver: props.postOwner,
    };

    setIsPending(true);

    await Moralis.transfer(options2);
    await contractProcessor.fetch({
      params: options1,
      onSuccess: () => console.log("success"),
      onError: (error) => console.error(error),
    });
  }

  return (
    <div>
      <Input
        type='number'
        size='large'
        style={{ width: "20%" }}
        onChange={(e) => {
          setAmount(`${e.target.value}`);
        }}
      />
      <button
        type='primary'
        size='large'
        style={{ width: "10%" }}
        loading={isPending}
        onClick={() => DoDonate("donate")}
        disabled={!tx}
      >
        Send
      </button>
      <>{postDonates}</>
    </div>
  );
}

export default Donate;
