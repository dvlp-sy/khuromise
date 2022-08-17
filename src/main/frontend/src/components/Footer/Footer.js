import React from "react";
import styled from "styled-components";

const FooterBlock = styled.footer`
  width: 100%;
  height: auto;
  border-top: 1px solid #bcbcbc;

  .box {
    max-width: 1000px;
    min-width: 520px;
    width: 60%;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
    display: block;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    color: #aaaaaa;
  }

  .rights {
    font-size: 18px;
    color: #aaaaaa;
    margin-bottom: 3px;
  }

  .club {
    font-size: 16px;
    color: #aaaaaa;
    margin-bottom: 3px;
  }

  .content {
    font-size: 12px;
    color: #aaaaaa;
    margin-bottom: 3px;
  }
`;

const Footer = () => {
  return (
    <FooterBlock>
      <div className="box">
        <div className="title">KHUromise</div>
        <div className="rights">
          <strong>© 2022. KHUromise</strong> All Rights Reserved.
        </div>
        <div className="club">경희대학교 컴퓨터공학부 동아리 HACKER</div>
        <div className="content">
          사이트 제작: 강경현, 권승원, 박예림, 변시윤, 양동균, 이천국
        </div>
      </div>
    </FooterBlock>
  );
};

export default React.memo(Footer);
