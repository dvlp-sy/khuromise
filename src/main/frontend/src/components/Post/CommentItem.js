import styled from "styled-components";
import useFetch from "../../hooks/useFetch";

const CommentItemBox = styled.div`
  width: 97%;
  height: auto;
  padding: 10px;
  margin-bottom: 10px;

  border: 1px solid #bcbcbc;
  border-radius: 6px;
  display: flex;
  padding: 10px;

  .userId {
    width: 70px;
    height: auto;
    margin-top: 10px;
  }

  .comment {
    width: 90%;
    height: auto;
    margin: 10px 0;
  }

  .delBtn {
    width: 40px;
    height: 20px;
    font-size: 8px;
    border: none;
    background-color: transparent;
    color: #ababab;
  }
`;

const CommentItem = ({ id }) => {
  const comments = useFetch(`http://localhost:3002/comments?postId=${id}`);
  const users = useFetch(`http://localhost:3002/users`);
  const findUsers = [...users];
  const findUser =
    findUsers.find(
      (user) => user.userId === sessionStorage.getItem("LoginUserInfo")
    ) || {};

  if (!comments[0] || comments[0].id === 0) {
    return null;
  }

  const delComment = (commentId) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      fetch(`http://localhost:3002/comments/${commentId}`, {
        method: "DELETE",
      });
      users.forEach((user) => {
        fetch("http://localhost:3002/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({
            ...user,
          }),
        });
      });
      alert("삭제가 완료되었습니다.");
      window.location.reload();
    }
  };

  return (
    <>
      {comments.map((comment) => {
        return (
          <CommentItemBox key={comment.id}>
            <div className="userId">{comment.writerName}</div>
            <div className="comment">{comment.comment}</div>
            {findUser.userId === comment.writerId && (
              <button className="delBtn" onClick={() => delComment(comment.id)}>
                삭제
              </button>
            )}
          </CommentItemBox>
        );
      })}
    </>
  );
};

export default CommentItem;
