import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisQuery, useMoralis, } from "react-moralis";
import { useState } from "react";
import { useEffect } from "react";

const Reputation = () => {
    const {Moralis} = useMoralis();
    const { walletAddress, contractABI, contractAddress, selectedCategory} = useMoralisDapp();
    const [reputationValue, setReputation] = useState(0);
    const contractABIJson = JSON.parse(contractABI)
    
    const { data: votes } = useMoralisQuery("Votes", (query) => query.equalTo("postOwner", walletAddress), [], {
        live: true,
      });
    
    const categoryId = selectedCategory["categoryId"]

    const options = {
        contractAddress: contractAddress,
        functionName: "getReputation",
        abi: contractABIJson,
        params: {
            _address: walletAddress,
            _categoryID:categoryId
        }
    };
    
    useEffect(() => {
    
      async function getReputation() {
        await Moralis.enableWeb3();
        const result = await Moralis.executeFunction(options);
        setReputation(result);
      }
    
        getReputation();
      }, [votes, walletAddress, categoryId]);

    return (
        <>{reputationValue}</>
    )
}

export default Reputation
