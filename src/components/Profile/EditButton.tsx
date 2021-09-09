import { MdEdit } from "react-icons/md";
import { useAppSelector } from "../../app/hooks";
import { selectAuthId } from "../../features/auth/authSlice";
import "./EditButton.css";

type EditButtonProps = { profileId: string; onClick: () => void };

const EditButton = ({ profileId, onClick }: EditButtonProps) => {
  const authId = useAppSelector(selectAuthId);

  if (authId !== profileId) return null;
  return (
    <>
      <div className="profile-editBtn-container">
        <button onClick={onClick} className="profile-editBtn">
          <MdEdit />
        </button>
      </div>
    </>
  );
};

export default EditButton;
