import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

const PostBox = styled.div`
  width : 90%;
  height : 100%;
  display : flex;
  justify-content : center;
  line-height : 29px;
`;

function ModSend({ titlevalue , contentvalue, noonvalue, hourvalue, minutevalue, peoplenumvalue, datevalue, purposevalue, gendervalue, positionvalue, placenamevalue }) {

  const users = useFetch(`http://localhost:3002/users`);
  const findUsers = [...users]
  const findUser = findUsers.find((user)=>user.userId === sessionStorage.getItem('LoginUserInfo')) || {};

  const { id } = useParams();
  const post = useFetch(`http://localhost:3002/posts/${id}`);
  const navigate = useNavigate();
  let gender = '';
  
  if (gendervalue === "남자만") {
    gender = 'm'
  }
  else if (gendervalue === "여자만") {
    gender = 'w'
  }
  else {
    gender = 'b'
  }
  
  console.log(gender);
  function onSubmit(e) {
    e.preventDefault();
    //const userApply = userApplyInfo.push(sessionStorage.getItem('LoginUserInfo'));
    //console.log(userApply);
    
    if (gender !== findUser.userGender && gender !== 'b') {
      alert("성별을 확인해 주세요.")
    }
    else {
      fetch(`http://localhost:3002/posts/${id}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json; charset=UTF-8"
        },
        body : JSON.stringify({
          ...post,
          date : datevalue,
          noon : noonvalue,
          hour : hourvalue,
          minute : minutevalue,
          category : purposevalue,
          genderDisplay : gendervalue,
          genderCheck : gender,
          maxPeople : peoplenumvalue,
          title : titlevalue,
          content : contentvalue,
          position : positionvalue,
          placeName : placenamevalue
        }),
      })
      .then(res =>{
        if (res.ok){
          alert("수정이 완료되었습니다");
          navigate(`/${purposevalue}`);
        }
      })
    }
  }
  
  return(
    <PostBox>
      <form style = {{
          width : '100%',
          display : 'flex',
          justifyContent : 'center'}} 
        onSubmit = {onSubmit}
      >
        <button style={{
          width : '80%',
          lineHeight : '20px'
        }}
        >
          등록
        </button>
      </form>
    </PostBox>
  );
}
export default ModSend;