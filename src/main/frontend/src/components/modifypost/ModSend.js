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

function ModSend({ titlevalue , contentvalue, noonvalue, hourvalue, minutevalue, peoplenumvalue, datevalue, purposevalue, gendervalue, latvalue, lonvalue, placenamevalue }) {

  const users = useFetch(`/api/users`);
  const findUsers = [...users]
  const findUser = findUsers.find((user)=>user.userid === sessionStorage.getItem('LoginUserInfo')) || {};
  console.log(findUser);

  const { id } = useParams();
  const post = useFetch(`/api/posts/id/${id}`);
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
    
    if (gender !== findUser.usergender && gender !== 'b') {
      alert("성별을 확인해 주세요.")
    }
    else {
      fetch(`/api/posts/modify/${id}`, {
        method : "PUT",
        headers : {
          "Content-Type" : "application/json; charset=UTF-8"
        },
        body : JSON.stringify({
          ...post,
          writerid : sessionStorage.getItem('LoginUserInfo'),
          writergender : findUser.usergender,
          date : datevalue,
          noon : noonvalue,
          hour : hourvalue,
          minute : minutevalue,
          category : purposevalue,
          genderdisplay : gendervalue,
          gendercheck : gender,
          currentpeople : post.currentpeople,
          maxpeople : peoplenumvalue,
          title : titlevalue,
          content : contentvalue,
          lat : latvalue,
          lon : lonvalue,
          placename : placenamevalue
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

  console.log(sessionStorage.getItem('LoginUserInfo'));
  console.log(findUser.usergender);
  console.log(datevalue);
  console.log(noonvalue);
  console.log(hourvalue);
  console.log(minutevalue);
  console.log(purposevalue);
  console.log(gendervalue);
  console.log(gender);
  console.log(post.currentpeople);
  console.log(peoplenumvalue);
  console.log(titlevalue);
  console.log(contentvalue);
  console.log(latvalue);
  console.log(lonvalue);
  console.log(placenamevalue);
  
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