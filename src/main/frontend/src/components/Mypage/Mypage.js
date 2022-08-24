import React, { useEffect } from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import PostListItem from "../PostList/PostListItem";
import CommentItem from "../Post/CommentItem";
import icon from "./icon.png";

const Mypagecontainer = styled.div`
  width: 100%;
  height: 23rem;
`;
const Mypagebox = styled.div`
  width: 61rem;
  height: 20rem;
  box-shadow: 0 0 8px 0 #bcbcbc;
  border-radius: 16px;
  margin: 3rem auto 0;
  display: grid;
  grid-template-columns: 13rem 16rem 16rem 16rem;
  grid-template-rows: 4rem 6rem 10rem;

  .item: nth-child(1) {
    grid-column: 1/2;
    grid-row: 1/3;
    border-right: 1px solid #bcbcbc;
    border-bottom: 1px solid #bcbcbc;
    display : flex;
    justify-content : center;
    align-items : center;
  }
  .item: nth-child(2) {
    grid-column: 1/2;
    grid-row: 3/4;
    border-right: 1px solid #bcbcbc;
  }
  .item: nth-child(3) {
    grid-column: 2/5;
    grid-row: 1/2;
    border-bottom: 1px solid #bcbcbc;
    margin: 1px;
  }
  .item: nth-child(4) {
    grid-column: 2/5;
    grid-row: 2/4;
    overflow: auto;
  }
`;
const Buttonstyle = styled.button`
  width: 31%;
  height: 4em;
  border: 1px solid #bcbcbc;
  border-radius: 10px;
  margin-left: 10px;
  margin-top: 4px;
  cursor: Pointer;
  text-align: center;
`;
const Button2 = styled.button`
  width: 10rem;
  height: 3rem;
  border: 1px solid #bcbcbc;
  border-radius: 10px;
  cursor: Pointer;
  margin-left: 22px;
  margin-top: 20px;
`;

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

const Logo = styled.img`
  width: 50%;
  height: 50%;
`;


function Mypage({ isLogin, setIsLogin }) {
  const findUsers = useFetch("/api/users");
  const findUser =
    findUsers.find(
      (user) => user.userid === sessionStorage.getItem("LoginUserInfo")
    ) || {};
  const userInfoId = findUser.id;

  const [list, setList] = useState([]);
  const posts = useFetch(`/api/posts`);
  const userPosts = posts.filter((post) => post.writerid === findUser.userid);
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.removeItem("LoginUserInfo");
    navigate(`/`);
    window.location.reload();
  };
  const comments = useFetch("/api/comment/all");
  const userComments = comments.filter(
    (comment) => comment.writerid === findUser.userid
  );

  const userApplies = useFetch(`/api/userapply/user/${findUser.userid}`);
  const applyPostIds = userApplies.map((apply) => apply.postid);
  const applyPosts = posts.filter((post) =>
    post.writerid === findUser.userid || applyPostIds.includes(String(post.id))
  );
  console.log(applyPosts);

  const [checks, setCheck] = useState([
    {
      id: 1,
      title: "나의 게시글",
      active: true,
    },
    {
      id: 2,
      title: "나의 댓글",
      active: false,
    },
    {
      id: 3,
      title: "약속 목록",
      active: false,
    },
  ]);

  const onToggle = (id) => {
    setCheck(
      checks.map((check) =>
        check.id === id
          ? { ...check, active: true }
          : { ...check, active: false }
      )
    );
  };

  useEffect(() => {
    const trueCheck = checks.find((check) => check.active === true);
    const title = trueCheck.title;
    switch (title) {
      case "나의 게시글":
        setList("게시글");
        break;
      case "나의 댓글":
        setList("댓글");
        break;
      case "약속 목록":
        setList("약속");
        break;
    }
  }, [checks, posts]);

  function Titles({ title, onToggle }) {
    return (
      <Buttonstyle
        style={{
          cursor: "pointer",
          color: title.active ? "black" : "#bcbcbc",
        }}
        onClick={() => onToggle(title.id)}
      >
        {title.title}
      </Buttonstyle>
    );
  }

  function PostList() {
    return userPosts
      .sort((a, b) => b.id - a.id)
      .map((post) => (
        <PostListItem
          key={post.id}
          id={post.id}
          category={post.category}
          title={post.title}
          date={post.date}
          noon={post.noon}
          hour={post.hour}
          minute={post.minute}
          placeName={post.placename}
          genderDisplay={post.genderdisplay}
          currentPeople={post.currentpeople}
          maxPeople={post.maxpeople}
          writtenTime={post.writtentime}
          isLogin={isLogin}
        />
      ));
  }

  const delComment = (comment) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      fetch(`/api/comment/delete/${comment.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          ...comment,
        }),
      });
      alert("삭제가 완료되었습니다.");
      window.location.reload();
    }
  };

  function CommentList() {
    return userComments
      .sort((a, b) => b.id - a.id)
      .map((comment) => (
        <Link key={comment.id} to={`/posts/${comment.postid}`}>
          <CommentItemBox>
            <div className="userId">{comment.writername}</div>
            <div className="comment">{comment.comment}</div>
            <button className="delBtn" onClick={() => delComment(comment)}>
              삭제
            </button>
          </CommentItemBox>
        </Link>
      ));
  }

  function ApplyList() {
    return applyPosts
      .sort((a, b) => b.id - a.id)
      .map((post) => (
        <PostListItem
          key={post.id}
          id={post.id}
          category={post.category}
          title={post.title}
          date={post.date}
          noon={post.noon}
          hour={post.hour}
          minute={post.minute}
          placeName={post.placename}
          genderDisplay={post.genderdisplay}
          currentPeople={post.currentpeople}
          maxPeople={post.maxpeople}
          writtenTime={post.writtentime}
          isLogin={isLogin}
        />
      ));
  }

  if (posts[0].id === 0) {
    return null;
  }

  const delUser = () => {
    fetch(`/api/delete/user/${userInfoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        ...findUser,
      }),
    });
    sessionStorage.removeItem("LoginUserInfo");
    setIsLogin(false);
    alert("회원탈퇴 성공");
    navigate("/");
  };

  return (
    <div>
      <Mypagecontainer>
        <Mypagebox>
          <div className="item">
            <Logo src={icon} />
          </div>
          <div className="item">
            <Button2 onClick={delUser}>회원탈퇴</Button2>
            <Button2 onClick={logOut}>로그아웃</Button2>
          </div>
          <div className="item">
            {checks.map((check) => (
              <Titles title={check} key={check.id} onToggle={onToggle} />
            ))}
          </div>
          <div className="item">
            {list === "게시글" && <PostList />}
            {list === "댓글" && <CommentList />}
            {list === "약속" && <ApplyList />}
          </div>
        </Mypagebox>
      </Mypagecontainer>
    </div>
  );
}

export default Mypage;
