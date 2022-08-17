import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EmptyPageBlock = styled.div`
  width: 100%;
  height: auto;

  .box {
    width: 300px;
    height: auto;
    margin: 250px auto;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h1 {
    font-size: 35px;
    color: gray;
  }

  p {
    font-size: 20px;
    color: #bcbcbc;
  }

  button {
    text-align: center;
    border: 1px solid #bcbcbc;
    margin: 5px;
  }
`;

const EmptyPage = () => {
  const navigate = useNavigate();
  return (
    <EmptyPageBlock>
      <div className="box">
        <h1>죄송합니다.</h1>
        <p>존재하지 않는 페이지 입니다.</p>
        <div>
          <button onClick={() => navigate("/")}>메인화면으로</button>
          <button onClick={() => navigate(-1)}>이전화면으로</button>
        </div>
      </div>
    </EmptyPageBlock>
  );
};

export default EmptyPage;
