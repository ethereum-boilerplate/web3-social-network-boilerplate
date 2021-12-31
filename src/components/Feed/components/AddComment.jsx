import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useMoralisFile } from "react-moralis";
import { useWeb3ExecuteFunction } from "react-moralis";
import { useState } from "react";
import { message } from "antd";

const AddComment = (props) => {
  const { contractABI, contractAddress, selectedCategory } = useMoralisDapp();
  const contractABIJson = JSON.parse(contractABI);
  const ipfsProcessor = useMoralisFile();
  const contractProcessor = useWeb3ExecuteFunction();
  const [file, setFile] = useState();
  const [content, setContent] = useState("");

  async function addComment(comment) {
    const contentUri = await processContent(comment);
    const categoryId = selectedCategory["categoryId"];
    const options = {
      contractAddress: contractAddress,
      functionName: "createPost",
      abi: contractABIJson,
      params: {
        _parentId: props.parentId,
        _contentUri: contentUri,
        _categoryId: categoryId,
      },
    };
    await contractProcessor.fetch({
      params: options,
      onSuccess: () => message.success("success"),
      onError: (error) => message.error(error),
    });
  }

  const processContent = async () => {
    const imageUrl = file !== undefined ? await processImage(file) : undefined;

    const params = {
      content: content,
      image: imageUrl,
    };
    const ipfsResult = await ipfsProcessor.saveFile(
      "post.json",
      { base64: btoa(JSON.stringify(params)) },
      { saveIPFS: true }
    );
    return ipfsResult._ipfs;
  };

  const processImage = async () => {
    const ipfsResult = await ipfsProcessor.saveFile("image.jpg", file, {
      type: "image/jpeg",
      saveIPFS: true,
    });
    return ipfsResult._ipfs;
  };

  const validateForm = () => {
    let result = !content ? false : true;
    return result;
  };

  const clearForm = () => {
    setFile("");
    setContent("");
  };

  function onSubmit(e) {
    e.preventDefault();
    if (!validateForm()) {
      return message.error("Remember to add the content of your comment");
    }
    addComment({ content });
    clearForm();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='row'>
        <div className='form-group'>
          <textarea
            type='text'
            className='mb-2 form-control'
            placeholder='Comment'
            rows='1'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type='file'
            className='mb-2 mt-2 form-control'
            value={null}
            onChange={async (e) => setFile(e.target.files[0])}
          />
        </div>
        <button type='submit' className='btn btn-dark'>
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddComment;
