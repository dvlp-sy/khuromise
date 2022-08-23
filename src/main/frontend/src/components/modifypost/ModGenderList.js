import React, {useState, useEffect} from 'react';
import styled from "styled-components";

const GenderBox = styled.div`
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

const GenderBarBox = styled.div`
  display : flex;
  justify-content : center; 
`;


function ModGenderList(props) {

  const gen = [
    {
      id : 1,
      gendertype : '남자만',
      active : true
    },
    {
      id : 2,
      gendertype : '여자만',
      active : false
    },
    {
      id : 3,
      gendertype : '성별무관',
      active : false
    }
  ];

  const [currentgender, setGender] = useState([]);
  const gender = props.mypost.genderdisplay;
  
  useEffect(() => {
    setGender(gen.map(gend => (
      gend.gendertype === gender ? {...gend, active : true} : {...gend, active : false})))
    props.setGenderValue(gender);
  },[gender]);


  const onToggle = (id) => {
    setGender(
      currentgender.map(gender => 
        gender.id === id ? { ...gender, active: true } : { ...gender, active: false }
        )
    );
    function isTrue(gender) {
      if (gender.id === id) {
        return true;
      }
    }
    props.setGenderValue(currentgender.find(isTrue).gendertype)
  };
  
  function Gender({ gender, onToggle }) {
    return (
      <b
        style = {{
          cursor:'pointer',
          color: gender.active ? 'red' : 'black'
        }}
        onClick = {()=> onToggle(gender.id)}
      >
      {gender.gendertype}
      </b>
    );
  }

  return (
    <GenderBarBox>
      {currentgender.map(gender => (
        <GenderBox key={gender.id}>
          <Gender gender={gender} key={gender.id} onToggle={onToggle}/>
        </GenderBox>
      ))}
    </GenderBarBox>
  );
}

export default ModGenderList;