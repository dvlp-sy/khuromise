import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';

const TitleBox = styled.div`
  width : 10%;
  height : 25px;
  border : 1px solid #bcbcbc;
  display : inline-block;
  text-align : center;
  line-height : 25px;
`;

const TitleWritingBox = styled.div`
  width : 80%;
  height : 25px;
  border : 1px solid #bcbcbc;
  display : inline-block;
  
`;

const TotalTitleBox = styled.div`
  width : 100%;
  height : 100%;
  display : flex;
  justify-content : center;
  
`;

function ModTitle(props) {
  const posttitle = props.mypost.title;
  const [title, setTitle] = useState('');

  useEffect(() => {
    setTitle(posttitle);
    props.setTitleValue(posttitle);
  }, [posttitle]);

  const titleRef = useRef();

  const onChange = (e) => {
    setTitle(e.target.value);
    props.setTitleValue(titleRef.current.value);
  };

  return (
    <div>
      <TotalTitleBox>
        <TitleBox>
          제목
        </TitleBox>
        <TitleWritingBox>
          <input style={{
            width : '80%',
            height : '18px',
            border : '0px solid #bcbcbc',
            position : 'relative',
            top : '8%'
            }}
            ref={titleRef}
            onChange={onChange}
            value={title || ''}
            />
        </TitleWritingBox>
      </TotalTitleBox>
    </div>
    )
}

export default ModTitle;