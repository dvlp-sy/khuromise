import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { NextCommentIdContext } from "../../context/Context";
import useFetch from "../../hooks/useFetch";
import CommentItem from "./CommentItem";

const CommentBlock = styled.div`
  width: 100%;
  height: auto;
  margin: 20px auto;
  box-shadow: 0 0 8px 0 #bcbcbc;
  border-radius: 20px;
  max-width: 800px;
  min-width: 520px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WriteForm = styled.form`
  width: 95%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px auto;
  margin-bottom: 0;

  .writeComment {
    width: 89%;
    height: 46px;
    border: 1px solid #bcbcbc;
    border-radius: 6px;
  }

  .writeSubmit {
    width: 9%;
    height: 50px;
    text-align: center;
    border: 1px solid #bcbcbc;
    border-radius: 6px;
    background-color: white;
  }

  .errorComment {
    width: 89%;
    height: 46px;
    border: 1px solid #bcbcbc;
    border-radius: 6px;
    text-align: center;
  }
`;

const CommentBox = styled.div`
  width: 95%;
  height: auto;
  margin: 20px auto;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorBox = styled.div`
  width: 97%;
  height: 40px;
  padding: 10px;
  margin-bottom: 10px;

  border: 1px solid #bcbcbc;
  border-radius: 6px;
  text-align: center;
  line-height: 40px;
  color: #bcbcbc;
  padding: 10px;
`;

const Comment = ({ id, visible }) => {
  const users = useFetch(`http://localhost:3002/users`);

  const nextId = useContext(NextCommentIdContext);
  const findUsers = [...users];
  const findUser =
    findUsers.find(
      (user) => user.userId === sessionStorage.getItem("LoginUserInfo")
    ) || {};

  const writerId = findUser.userId;
  const writerName = findUser.userName;
  const commentRef = useRef(null);
  const [writingComment, setWritingComment] = useState(null);
  const commentChange = () => {
    setWritingComment(commentRef.current.value);
  };
  const commentSubmit = () => {
    if (writingComment) {
      fetch("http://localhost:3002/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          id: nextId,
          postId: id,
          writerId: writerId,
          writerName: writerName,
          comment: writingComment,
        }),
      }).then((res) => {
        if (res.ok) {
          window.location.reload();
        }
      });
    } else {
      alert("댓글을 먼저 작성해주세요.");
    }
  };

  return (
    <CommentBlock>
      {visible ? (
        <>
          <WriteForm>
            <input
              className="writeComment"
              placeholder="댓글을 작성해주세요."
              type="text"
              ref={commentRef}
              onChange={commentChange}
            />
            <input
              className="writeSubmit"
              placeholder="댓글달기"
              type="submit"
              onClick={commentSubmit}
            />
          </WriteForm>
          <CommentBox>
            <CommentItem id={id} />
          </CommentBox>
        </>
      ) : (
        <>
          <WriteForm>
            <input
              className="errorComment"
              placeholder="먼저 로그인 후 신청하기를 눌러주세요."
              disabled
            />
            <button className="writeSubmit">댓글달기</button>
          </WriteForm>
          <CommentBox>
            <ErrorBox>약속에 참가한 사람만 댓글을 볼 수 있습니다.</ErrorBox>
          </CommentBox>
        </>
      )}
    </CommentBlock>
  );
};

export default Comment;
