import placeholder from "../../images/placeholder.jpg";

const Preview = (props: { url: string }) => {
  return (
    <img
      className="addImg-img"
      src={props.url || placeholder}
      alt="Post preview"
    />
  );
};

export default Preview;
