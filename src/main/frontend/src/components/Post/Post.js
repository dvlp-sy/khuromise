import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import clock from "./clock-outline.png";
import people from "./account-group.png";
import male from "./gender-male.png";
import female from "./gender-female.png";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import EmptyPage from "../EmptyPage";
import Comment from "./Comment";
import PostMap from "./PostMap";

const PostBlock = styled.div`
  width: 100%;
  height: auto;
  margin: 20px auto;
  box-shadow: 0 0 8px 0 #bcbcbc;
  border-radius: 20px;
  max-width: 800px;
  min-width: 520px;
`;

const PostHeader = styled.div`
  width: 95%;
  height: auto;
  border-bottom: 1px solid #bcbcbc;
  margin: 0 auto;
  padding-top: 10px;
`;

const UpperBox = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-size: 30px;
    line-height: 40px;
    margin-left: 40px;
  }

  button {
    width: 70px;
    height: 40px;
    font-size: 16px;
    text-align: center;
    line-height: 30px;
    margin-right: 40px;
    border: 1px solid #bcbcbc;
    border-radius: 5px;
  }
`;

const UnderBox = styled.div`
  margin: 10px auto;
  width: 80%;
  height: 50px;

  display: flex;
  justify-content: space-around;
  align-items: center;

  .item {
    width: 300px;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-bottom: 5px;
`;

const PostBody = styled.div`
  width: 95%;
  height: auto;
  margin: 20px auto;

  .map {
    height: 400px;
    width : 400px;
    border: 1px solid #bcbcbc;
    margin: 0 auto;
    margin-bottom: 10px;
  }

  .content {
    border-top: 1px solid #bcbcbc;
    border-bottom: 1px solid #bcbcbc;
    font-size: 15px;
    padding: 25px;
  }
`;

const Buttons = styled.div`
  width: 95%;
  height: 25px;
  margin: 0 auto;
  padding: 10px;

  text-align: end;

  button {
    width: 40px;
    height: 25px;
    font-size: 13px;
    text-align: center;
    line-height: 20px;
    margin-right: 5px;
    border: 1px solid #bcbcbc;
    border-radius: 5px;
  }
`;

const Post = (props) => {
  const { id } = useParams();
  const posts = useFetch(`http://localhost:3002/posts?id=${id}`);
  const users = useFetch(`http://localhost:3002/users`);
  const comments = useFetch(`http://localhost:3002/comments?postId=${id}`);

  const post = { ...posts[0] };
  const date = String(post.date);
  const currentPeople = Number(post.currentPeople);
  const [_post, set_Post] = useState(post);
  const navigate = useNavigate();
  // const { isLogin } = props;

  // 조건 추가하기 => 성별이 조건에 만족한다면 진행

  const findUsers = [...users];
  const findUser =
    findUsers.find(
      (user) => user.userId === sessionStorage.getItem("LoginUserInfo")
    ) || {};
  const array = post.userApply || [];

  const applyClick = () => {
    if (window.confirm("신청하시겠습니까?")) {
      if (array.includes(findUser.userId)) {
        alert("이미 신청되었습니다.");
      } else if (post.currentPeople < post.maxPeople) {
        if (
          post.genderCheck === "b" ||
          post.genderCheck === findUser.userGender
        ) {
          const userArray = array.concat([findUser.userId]);
          console.log(userArray);
          fetch(`http://localhost:3002/posts/${post.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...post,
              userApply: userArray,
              currentPeople: currentPeople + 1,
            }),
          }).then((res) => {
            if (res.ok) {
              alert("신청이 완료되었습니다.");
              window.location.reload();
            }
          });
        } else {
          alert("신청이 불가능합니다.");
        }
      } else {
        alert("모집 인원이 가득 찼습니다.");
        window.location.reload();
      }
    }
  };

  // 조건 추가하기 => 글쓴이만 수정 OR 삭제 가능
  const delPost = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      fetch(`http://localhost:3002/posts/${post.id}`, {
        method: "DELETE",
      });
      comments.forEach((comment) => {
        fetch(`http://localhost:3002/comments/${comment.id}`, {
          method: "DELETE",
        }).then((res) => console.log(comment.id));
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
      navigate(`/${post.category}`);
    }
  };

  if (post.id === 0) {
    return null;
  }

  return (
    <>
      {post.id ? (
        <>
          <PostBlock>
            <PostHeader>
              <UpperBox>
                <h1>{post.title}</h1>
                <button onClick={applyClick}>신청하기</button>
              </UpperBox>
              <UnderBox>
                <div className="item">
                  <Img src={clock} />
                  {post.date
                    ? `${date.slice(0, 4)}년 ${date.slice(5, 7)}월
                  ${date.slice(8, 10)}일 ${post.noon}
                  ${post.hour}:${post.minute}`
                    : ""}
                </div>
                <div className="item">
                  <div>
                    <Img src={male} />
                    <Img src={female} />
                  </div>
                  {post.genderDisplay}
                </div>
                <div className="item">
                  <Img src={people} />
                  {post.currentPeople} / {post.maxPeople}
                </div>
              </UnderBox>
            </PostHeader>
            <PostBody>
              <PostMap />
              <div className="content" style={{whiteSpace : 'pre'}}>{post.content}</div>
              <Buttons>
                {/* 작성자만 수정 OR 삭제 가능 */}
                {post.writerId === findUser.userId && (
                  <button
                    onClick={() =>
                      navigate(`/${post.category}/${post.id}/modifypost`)
                    }
                  >
                    수정
                  </button>
                )}
                {post.writerId === findUser.userId && (
                  <button onClick={delPost}>삭제</button>
                )}
              </Buttons>
            </PostBody>
          </PostBlock>
          <Comment id={id} visible={post.userApply.includes(findUser.userId)} />
        </>
      ) : (
        <EmptyPage />
      )}
    </>
  );
};

export default Post;
