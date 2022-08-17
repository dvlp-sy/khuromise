import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const PostListItemBlock = styled.div`
  width: 100%;
  height: auto;
  margin: 10px auto;
  border-bottom: 1px solid #bcbcbc;
  min-width: 200px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-bottom: 10px;
`;

const LeftBox = styled.div`
  width: 80%;
  height: 70px;
  margin-left: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const RightBox = styled.div`
  width: 10%;
  height: 70px;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const Title = styled.div`
  width: 100%;
  height: 25px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  background-color: white;
  cursor : pointer;

  display: flex;
  justify-content: flex-start;
`;

const Date = styled.div`
  width: 100%;
  height: 17px;
  font-size: 16px;
`;

const Place = styled.div`
  width: 100%;
  height: 17px;
  font-size: 16px;
`;

const Participant = styled.div`
  width: 100%;
  height: 70px;
  font-size: 20px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const GenderBox = styled.div`
  width: 10%;
  height: 70px;
  font-size: 15px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const PostListItem = ({
  id,
  category,
  title,
  date,
  noon,
  hour,
  minute,
  placeName,
  genderDisplay,
  currentPeople,
  maxPeople,
  isLogin
}) => {
  const _date = date.split("-");

  const navigate = useNavigate();
  const onClick = () => {
    if (isLogin === true) {
      navigate(`/${category}/${id}`);
    }
    else {
      alert("로그인 후 이용 가능합니다.");
      navigate(`/login`);
    }
  }

  return (
    <PostListItemBlock>
      <LeftBox>
        <Title onClick={onClick}>{title}</Title>
        <Date>{`${_date[0]}년 ${_date[1]}월 ${_date[2]}일 ${noon} ${hour}:${minute}`}</Date>
        <Place>{placeName}</Place>
      </LeftBox>
      <GenderBox>{genderDisplay}</GenderBox>
      <RightBox>
        <Participant>
          {currentPeople} / {maxPeople}
        </Participant>
      </RightBox>
    </PostListItemBlock>
  );
};

export default PostListItem;
