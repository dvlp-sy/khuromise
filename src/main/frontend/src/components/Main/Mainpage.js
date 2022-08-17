import React, { useEffect } from "react";
import styled from "styled-components";
import Post5 from "./Post5";
import Search from "./Search";
import Myprofile from "./Myprofile";

const Container = styled.div`
  width: auto;
  min-width: 900px;
  height: 100%;
  min-height: 500px;
  margin-top: 5%;
  margin-left: 5%;

  .containerbox {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: 2% 30% 60% 2%;
    grid-template-columns: 30% 60%;
    column-gap: 40px;
    row-gap: 10px;

    .blank1 {
      grid-column: 1/ span2;
      grid-row: 1/2;
    }
    .blank2 {
      grid-column: 1/ span 2;
      grid-row: 4/5;
    }
    .searchbox {
      grid-column: 1/2;
      grid-row: 2/3;
      display: flex;
      margin: 1em;
      padding: 1em;
    }
    .profilebox {
      grid-column: 1/2;
      grid-row: 3/ span1;
    }
    .postbox {
      grid-column: 2/3;
      grid-row: 2/ span 2;
      padding: 1%;
      min-height: 20em;
    }
  }
`;


const Mainpage = ({ isLogin, setIsLogin }) => {
  //const { loginUser } = useContext(LoginUserContext);

  console.log(isLogin);
  console.log(sessionStorage.getItem('LoginUserInfo'));

  useEffect(() => {
    if (sessionStorage.getItem('LoginUserInfo') === null) {
      setIsLogin(false);
    }
    else {
      setIsLogin(true);
    }
  });
  
  return (
    <div>
      <Container>
        <div className="containerbox">
          <div className="blank1"></div>
          <div className="searchbox">
            <Search />
          </div>
          <div className="profilebox">
            <Myprofile isLogin = {isLogin} />
          </div>
          <div className="postbox">
            <Post5 isLogin={isLogin}/>
          </div>
          <div className="blank2"></div>
        </div>
      </Container>
    </div>
  );
};

export default Mainpage;
