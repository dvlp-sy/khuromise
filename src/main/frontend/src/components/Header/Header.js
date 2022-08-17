import React, { useEffect } from "react";
import styled from "styled-components";
import icon from "./icon.png";
import { Link, useNavigate } from "react-router-dom";

const HeaderBlock = styled.header`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #bcbcbc;
  margin: 0 auto;

  min-width: 520px;
`;

const ItemBox = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  max-width: 1000px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  width: 110px;
  height: 45px;
`;

const ButtonBox = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogRegButton = styled.button`
  width: 80px;
  height: 35px;
  margin-left: 5px;
  border: 1px solid black;
  border-radius: 6px;
  background-color: #f9fafb;
  font-size: 14px;
  cursor: pointer;

  text-align: center;
  line-height: 25px;
`;

const Header = (props) => {
  const { isLogin, setIsLogin } = props;
  const navigate = useNavigate();

  const onClick1 = () => {
    window.location.load();
  };

  const onClick2 = () => {
    if (isLogin === false) {
      navigate(`/login`);
    } else {
      sessionStorage.removeItem("LoginUserInfo");
      setIsLogin(false);
      navigate(`/`);
      window.location.reload();
    }
  };

  const onClick3 = () => {
    if (isLogin === true) {
      navigate(`/mypage/mypostlist`);
      window.location.reload();
    } else {
      navigate(`/register`);
      window.location.reload();
    }
  };

  return (
    <HeaderBlock>
      <ItemBox>
        <Link to="/" onClick={onClick1}>
          <Logo src={icon} />
        </Link>
        <ButtonBox>
          <LogRegButton onClick={onClick2}>
            {isLogin ? "로그아웃" : "로그인"}
          </LogRegButton>
          <LogRegButton onClick={onClick3}>
            {isLogin ? "나의게시글" : "회원가입"}
          </LogRegButton>
        </ButtonBox>
      </ItemBox>
    </HeaderBlock>
  );
};

export default React.memo(Header);
