import { ChangeEvent, useState } from "react";
import { FaTimes } from "react-icons/fa";
import Preview from "./Preview";
import DropZone from "../Dropzone/DropZone";
import "./AddPostModal.css";

interface AddPostModalProps {
  onCancel: () => void;
  onCaptionChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.SyntheticEvent) => void;
  caption: string;
  setFile: (file: File) => void;
  file: File | null;
}

const AddPostModal = (props: AddPostModalProps) => {
  const [preview, setPreview] = useState("");

  const onFile = (file: File) => {
    props.setFile(file);
    setPreview(URL.createObjectURL(file));
  };
  return (
    <div className="addImg-modal">
      <FaTimes className="modal-close" onClick={props.onCancel} />
      <div className="addImg-modal-content">
        <h1 className="addImg-modal-h1">Add Post</h1>
        <div>
          <Preview url={preview} />
          <div className="addImg-form">
            <DropZone onFile={onFile} file={props.file} />
            <textarea
              id="caption"
              name="caption"
              className="caption"
              rows={5}
              value={props.caption}
              onChange={props.onCaptionChange}
              placeholder="Write a caption..."
            />
            <button
              type="submit"
              onClick={props.onSubmit}
              className="addImg-btn-save"
              disabled={!props.file}
            >
              Post
            </button>
            <button onClick={props.onCancel} className="addImg-btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPostModal;
