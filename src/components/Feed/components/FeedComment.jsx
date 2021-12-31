import Posts from "./Comments";
import glStyles from "components/gstyles";
const Feed = (props) => {
  let result = (
    <div>
      <Posts
        className='col-lg-9'
        style={{
          ...glStyles.card,
          padding: "10px 13px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        parentId={props.parentId}
      />
    </div>
  );

  return result;
};

export default Feed;
