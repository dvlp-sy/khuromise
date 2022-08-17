import React , {Component, useState, useEffect} from 'react';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';
import { useParams, BrowserRouter as Router, Switch, Route, Link, useNavigate } from "react-router-dom";
import { ReactDOM } from 'react';
import { render } from '@testing-library/react';
import PostList from '../PostList/PostList';
import PostListItem from '../PostList/PostListItem';

const TotalBox = styled.div`
  display : flex;
  flex-direction : column;
`;

const PurposeBox = styled.div`
  width: 20%;
  height : 30px;
  display : inline-block;
  border-bottom: 1px solid #bcbcbc;
  position : relative;
  font-size: 15px;
  text-align : center;
  margin-top: 10px;
`;

const PurposeBarBox = styled.div`
  display : flex;
  justify-content : center; 
`;

const Listbox = styled.div`
  width: 100%;
  height: 100%;
  min-height: 350px;
  margin : 1px;
  box-shadow: 0 0 8px 0 #bcbcbc;
  border-radius: 16px;
  display: grid;

  .List {
    margin: 5px 10px;
    text-align: initial;
  }
`

function Post5(props){
  const { isLogin } = props;
  const posts = useFetch(`http://localhost:3002/posts`);
 
  const [postList, setList] = useState([]);
  
  const [purposes, setPur] = useState([
    {
      id : 1,
      purname : '식사',
      active : true
    },
    {
      id : 2,
      purname : '운동',
      active : false
    },
    {
      id : 3,
      purname : '게임',
      active : false
    },
    {
      id : 4,
      purname : '공부',
      active : false
    },
    {
      id : 5,
      purname : '기타',
      active : false
    }
  ]);

  
  useEffect(() => {
    const findposts = [...posts] || [];
    const truePurpose = purposes.find((category) => category.active === true);
    const category = truePurpose.purname;
    setList(findposts.filter((post) => post.category === category));
    },[purposes, posts]);

  const onToggle = id => {
    setPur(
      purposes.map(purpose => 
        purpose.id === id ? { ...purpose, active: true } : { ...purpose, active: false }
        ));
    
  }

  function Purpose({ purpose, onToggle }) {
    return (
      <b
        style = {{
          cursor:'pointer',
          color: purpose.active ? 'black' : '#bcbcbc'
        }}
        onClick = {()=> onToggle(purpose.id)}
      >
      {purpose.purname}
      </b>
    );
  }


  function PostList({postList}) {

    return (
      postList.map((post) =>
      <PostListItem
                  key={post.id}
                  id={post.id}
                  category={post.category}
                  title={post.title}
                  date={post.date}
                  noon={post.noon}
                  hour={post.hour}
                  minute={post.minute}
                  placeName={post.placeName}
                  genderDisplay={post.genderDisplay}
                  currentPeople={post.currentPeople}
                  maxPeople={post.maxPeople}
                  writtenTime={post.writtenTime}
                  isLogin={isLogin}
                />
        )
      
      
    );
  }

  return (
    <TotalBox>
      <Listbox>
        <PurposeBarBox>
          {purposes.map(purpose => (
            <PurposeBox key={purpose.id}>
              <Purpose purpose={purpose} key={purpose.id} onToggle={onToggle}/>
            </PurposeBox>
          ))}
        </PurposeBarBox>
        <div className='List'>
          <PostList 
          postList={postList} onToggle={onToggle}  isLogin={isLogin}  />
        </div>
      </Listbox>
      
    </TotalBox>
  );
}




export default Post5;