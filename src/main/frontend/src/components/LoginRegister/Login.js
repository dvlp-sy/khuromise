import styled from "styled-components";
import icon from "./../Header/icon.png";
import { useState } from "react";
import fetchLogin from "./fetchLogin";
import { useNavigate, Link } from "react-router-dom";

const LoginTemplate = styled.div`
  width: 300px;
  height: 300px;
  margin: 190px auto;
  box-shadow: 0 0 8px 0 #bcbcbc;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
`;

const LoginBox = styled.div`
  width: 300px;
  height: 80px;
  margin: 0;
  margin-top: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  .input_box {
    width: 200px;
    height: auto;
    margin-right: 10px;
  }

  input {
    width: 200px;
    height: 30px;
    border: 1px solid #bcbcbc;
    border-radius: 6px;
    margin-bottom: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login_btn {
    width: 70px;
    height: 73px;
    border: 1px solid #bcbcbc;
    border-radius: 6px;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .id {
    border-bottom: none;
  }
`;

const Logo = styled.img`
  width: 200px;
  height: 90px;
`;

const BottomBox = styled.div`
  width: 200px;
  height: 60px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 10px;
  button {
    border: 1px solid #bcbcbc;
    border-radius: 6px;
    background-color: #eaeaea;
    cursor: pointer;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  // 입력한 id, pw 상태 관리
  const [inputAccount, setInputAccount] = useState({
    inputId: "",
    inputPw: "",
  });

  const { inputId, inputPw } = inputAccount;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputAccount({
      ...inputAccount,
      [name]: value,
    });
  };

  // 로그인 account 정보 불러오기
  const onClick = async () => {
    try {
      const LoginUser = await fetchLogin(inputAccount);
      //console.log(LoginUser);
      if (LoginUser !== undefined) {
        sessionStorage.setItem("LoginUserInfo", LoginUser.userId);
        navigate(`/`);
      }
    } catch (error) {
      window.alert(error);
    }
  };

  return (
    <LoginTemplate>
      <Logo src={icon} />
      <LoginBox>
        <div className="input_box">
          <input
            name="inputId"
            type="text"
            placeholder="ID"
            value={inputId}
            onChange={onChange}
          ></input>
          <input
            name="inputPw"
            type="password"
            placeholder="Password"
            value={inputPw}
            onChange={onChange}
          ></input>
        </div>
        <button
          className="login_btn"
          style={{ cursor: "pointer" }}
          onClick={onClick}
        >
          로그인
        </button>
      </LoginBox>
      <BottomBox>
        <button>아이디/비밀번호 찾기</button>
        <Link to="/register">
          <button style={{ cursor: "pointer" }}>회원가입</button>
        </Link>
      </BottomBox>
    </LoginTemplate>
  );
};

export default Login;
