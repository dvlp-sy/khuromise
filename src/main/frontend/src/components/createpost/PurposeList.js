import React, {useState} from 'react';
import styled from "styled-components";

const PurposeBox = styled.div`
  width: 18%;
  height : 30px;
  margin : auto;
  display : inline-block;
  border: 1px solid #bcbcbc;
  position : relative;
  font-size: 15px;
  text-align : center;
  line-height : 30px;
`;

const PurposeBarBox = styled.div`
  display : flex;
  justify-content : center; 
`;


function PurposeList(props) {
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
  
  const onToggle = id => {
    setPur(
      purposes.map(purpose => 
        purpose.id === id ? { ...purpose, active: true } : { ...purpose, active: false }
      )
    );
    function isTrue(purpose) {
      if (purpose.id === id) {
        return true;
      }
    }
    props.setPurposeValue(purposes.find(isTrue).purname);
  }
  
  function Purpose({ purpose, onToggle }) {
    
    return (
      <b
        style = {{
          cursor:'pointer',
          color: purpose.active ? 'red' : 'black'
        }}
        onClick = {()=> onToggle(purpose.id)}
      >
      {purpose.purname}
      </b>
    );
  }

  return (
    <PurposeBarBox>
      {purposes.map(purpose => (
        <PurposeBox key={purpose.id}>
          <Purpose purpose={purpose} key={purpose.id} onToggle={onToggle}/>
        </PurposeBox>
      ))}
    </PurposeBarBox>
  );
}

export default PurposeList;