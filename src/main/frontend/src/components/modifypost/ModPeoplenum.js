import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';

const PeopleBox1 = styled.div`
  width : 100%;
  height : 30px;
  border : 1px solid #bcbcbc;
  margin : auto;
  display : flex;
  flex-direction: column;
  justify-content : center;
`;

const PeopleBox2 = styled.div`
  display : flex;
  justify-content : center;
`;



function ModPeoplenum(props) {

  const peopleNumRef = useRef(null);
  const peoplenumprop = props.mypost.maxpeople;
  const [ppnum, setPpNum] = useState();

  useEffect(() => {
    setPpNum(peoplenumprop);
    props.setPeopleNumValue(peoplenumprop);
  },[peoplenumprop]);


  const onChange = (e) => {
    setPpNum(e.target.value);
    props.setPeopleNumValue(peopleNumRef.current.value);
  }

  return (
    <PeopleBox1>
      <PeopleBox2>
        인원수 : 
        <input ref={peopleNumRef} onChange={onChange}
          style={{
            width : '30%',
            height : '17px'
          }}
          type = 'number'
          placeholder = '숫자를 입력하세요'
          value= {ppnum || ''}
        />
      </PeopleBox2>
    </PeopleBox1>
  );
}

export default ModPeoplenum;