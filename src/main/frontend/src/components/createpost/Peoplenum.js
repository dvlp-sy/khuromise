import React, { useRef } from 'react';
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



function Peoplenum(props) {

  const peopleNumRef = useRef(null);

  const onChange = () => {
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
        />
      </PeopleBox2>
    </PeopleBox1>
  );
}

export default Peoplenum;