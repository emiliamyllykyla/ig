import { useMemo, useState } from "react";
import { Post } from "../../features/posts/postsSlice";
import Modal from "../Modal/Modal";
import PostModal from "./PostModal";
import "./Grid.css";

const Grid = ({ items }: { items: Post[] }) => {
  const [openPost, setOpen] = useState<Post | null>(null);

  const gridItems = useMemo(
    () => (
      <>
        {items.map((item) => (
          <div
            key={item.id}
            className="grid-item"
            onClick={() => setOpen(item)}
          >
            <img src={item.data.imageUrl} alt="post" />
          </div>
        ))}
      </>
    ),
    [items]
  );

  return (
    <div className="grid">
      {gridItems}
      {openPost && (
        <Modal>
          <PostModal postId={openPost.id} onClose={() => setOpen(null)} />
        </Modal>
      )}
    </div>
  );
};

export default Grid;
