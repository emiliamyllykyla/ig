import Dropzone from "react-dropzone";

type DropzoneProps = {
  onFile: (file: File) => void;
  file: File | null;
};

const DropZone = (props: DropzoneProps) => {
  const onDrop = (files: File[]) => {
    if (files[0]) {
      props.onFile(files[0]);
    }
  };

  return (
    <Dropzone onDrop={onDrop} accept={"image/*"} multiple={false}>
      {({ getRootProps, getInputProps }) => (
        <div className="dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          <p>
            Drag 'n' drop a file here,
            <br /> or click to select file <br />
            {props.file && <span>Selected: {props.file.name}</span>}
          </p>
        </div>
      )}
    </Dropzone>
  );
};

export default DropZone;
