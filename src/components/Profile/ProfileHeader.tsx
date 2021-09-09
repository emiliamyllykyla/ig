import { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUserById } from "../../features/users/usersSlice";
import EditButton from "./EditButton";
import EditModal from "../Edit/EditModal";
import Modal from "../Modal/Modal";
import Follow from "./Follow";
import ProfileTable from "./ProfileTable";
import "./ProfileHeader.css";

const ProfileHeader = ({ profileId }: { profileId: string }) => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const profile = useAppSelector(selectUserById(profileId));

  if (!profile) return <div>Not found</div>;
  if (openEditModal)
    return (
      <Modal>
        <EditModal onClose={() => setOpenEditModal(false)} />
      </Modal>
    );

  return (
    <div className="profile-header">
      <div className="profile-img-container">
        <img className="profile-img" src={profile.imageUrl} alt="profile" />
      </div>
      <div className="profile-info">
        <div className="profile-username">
          {profile.username}
          <EditButton
            onClick={() => setOpenEditModal(true)}
            profileId={profile.uid}
          />
        </div>
        <ProfileTable profileId={profileId} />
        <div className="profile-bio">{profile.bio}</div>
        <Follow profileId={profile.uid} />
      </div>
    </div>
  );
};

export default ProfileHeader;
