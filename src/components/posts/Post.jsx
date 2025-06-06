/** @jsx createVNode */
import { createVNode } from "../../lib";
import { toTimeFormat } from "../../utils/index.js";
import { globalStore } from "../../stores/index.js";

export const Post = ({
  id,
  author,
  time,
  content,
  likeUsers,
  activationLike = false,
}) => {
  const { currentUser, posts, loggedIn } = globalStore.getState();
  const hasLiked = posts
    .find((post) => post.id === id)
    .likeUsers.includes(currentUser?.username);
  const handleClick = () => {
    if (!loggedIn) {
      alert("로그인 후 이용해주세요");
      return;
    }

    const post = posts.find((post) => post.id === id);

    if (hasLiked) {
      post.likeUsers = post.likeUsers.filter(
        (user) => user !== currentUser?.username,
      );
    } else {
      post.likeUsers.push(currentUser?.username);
    }
    globalStore.setState({ posts: posts });
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex items-center mb-2">
        <div>
          <div className="font-bold">{author}</div>
          <div className="text-gray-500 text-sm">{toTimeFormat(time)}</div>
        </div>
      </div>
      <p>{content}</p>
      <div className="mt-2 flex justify-between text-gray-500">
        <span
          onClick={handleClick}
          className={`like-button cursor-pointer${hasLiked ? " text-blue-500" : ""}`}
        >
          좋아요 {likeUsers.length}
        </span>
        <span>댓글</span>
        <span>공유</span>
      </div>
    </div>
  );
};
