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
  const comments = useFetch(`/api/comment/data/${id}`);
  const findUsers = useFetch(`/api/users`);
  const findUser =
    findUsers.find(
      (user) => user.userid === sessionStorage.getItem("LoginUserInfo")
    ) || {};

  console.log(findUser);
  console.log(comments);

  if (!comments[0] || comments[0].id === 0) {
    return null;
  }

  const delComment = (comment) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      fetch(`/api/comment/delete/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body : JSON.stringify({
          ...comment
        })
      });
      /*
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
      */
      alert("삭제가 완료되었습니다.");
      window.location.reload();
    }
  };

  return (
    <>
      {comments.map((comment) => {
        return (
          <CommentItemBox key={comment.id}>
            <div className="userId">{comment.writername}</div>
            <div className="comment">{comment.comment}</div>
              <button className="delBtn" onClick={() => delComment(comment)}>
                삭제
              </button>
            {/*{findUser.userid === comment.writerid && (
            )}*/}
          </CommentItemBox>
        );
      })}
    </>
  );
};

export default CommentItem;
