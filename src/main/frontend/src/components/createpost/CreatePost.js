import React, {useState} from 'react';
import styled from "styled-components";
import PurposeList from "./PurposeList";
import Time from "./Time";
import Place from "./Place";
import Peoplenum from "./Peoplenum";
import GenderList from "./GenderList";
import PostTitle from "./PostTitle";
import PostContents from "./PostContents";
import Line from "./Line";
import PostSend from './PostSend';

/* const PurposeListBox = styled.div`
  
`; */

const CreatePostBox = styled.div`
  display : flex;
  justify-content : center;
  margin : 10px;

  .CreatePost {
    display : grid;
    width : 90%;
    height : auto;
    grid-gap : 5px;
    grid-template-columns : 2fr 1fr 1fr;
    grid-template-rows : 50px 50px 20px 50px 1fr 30px;
    grid-template-areas :'PurposeListBox PromTimeBox PromTimeBox'
                         'GenderBox PeopleNumBox PeopleNumBox'
                         'LineBox LineBox LineBox'
                         'PlaceBox PostTitleBox PostTitleBox'
                         'PlaceBox PostContentsBox PostContentsBox'
                         '. . SendBox';
  }

  .CreatePost div {
    
  }

  .PurposeListBox {
    grid-area : PurposeListBox;
    display: flex;
    flex-direction: column;
    justify-content: center;
    border : 1px solid #bcbcbc;
  }

  .PromTimeBox {
    grid-area : PromTimeBox;
    padding : 10px;
    border : 1px solid #bcbcbc;
  }
    
  .PeopleNumBox {
    grid-area : PeopleNumBox;
    padding : 10px;
    border : 1px solid #bcbcbc;
  }
  

  .GenderBox {
    grid-area : GenderBox;
    padding : 10px;
    border : 1px solid #bcbcbc;
  }
  
  
  .LineBox {
    grid-area : LineBox;
    padding : 1px;
    display : flex;
    justify-content : center;
  }
  

  .PlaceBox {
    grid-area : PlaceBox;
    border : 1px solid #bcbcbc;
    display : flex;
    justify-content : center;
    align-items : center;
  }
  

  .PostTitleBox {
    grid-area : PostTitleBox;
    padding : 10px;
    border : 1px solid #bcbcbc;
  }
  

  .PostContentsBox {
    grid-area : PostContentsBox;
    padding : 10px;
    border : 1px solid #bcbcbc;
  }
  

  .SendBox {
    grid-area : SendBox;
    border : 1px solid #bcbcbc;
    display : flex;
    justify-content : center;
  }
  
`;

function CreatePost(props) {

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayDate = today.getDate();
  const todayMonth = today.getMonth()+1;

  const exactMonth = (todayMonth) => {
    if (todayMonth >= 10) {
      return todayMonth;
    }
    else {
      return '0'+todayMonth;
    }
  }
  
  const exactDate = (todayDate) => {
    if (todayDate >= 10) {
      return todayDate;
    }
    else {
      return '0'+todayDate;
    }
  }

  const [titlevalue, setTitleValue] = useState('제목없음');
  const [contentvalue, setContentsValue] = useState('내용없음');
  const [noonvalue, setNoonValue] = useState('오전');
  const [hourvalue, setHourValue] = useState('1');
  const [minutevalue, setMinuteValue] = useState('00');
  const [peoplenumvalue, setPeopleNumValue] = useState('2');
  const [datevalue, setDateValue] = useState(todayYear+'-'+exactMonth(todayMonth)+'-'+exactDate(todayDate));
  const [purposevalue, setPurposeValue] = useState('식사');
  const [gendervalue, setGenderValue] = useState('남자만');
  const [positionvalue, setPositionValue] = useState([37.2437815,127.0764067]);
  const [placenamevalue, setPlacenameValue] = useState('경희대학교 국제캠퍼스');

  /*
  console.log(titlevalue);
  console.log(contentvalue);
  console.log(datevalue);
  console.log(noonvalue);
  console.log(hourvalue);
  console.log(minutevalue);
  console.log(peoplenumvalue);
  console.log(exactMonth(todayMonth));
  */
  console.log(positionvalue);
  console.log(placenamevalue);
  return (
    <CreatePostBox>
      <div className="CreatePost">
        <div className="PurposeListBox">
          <PurposeList setPurposeValue = {setPurposeValue} />
        </div>
        <div className="PromTimeBox">
          <Time setNoonValue={setNoonValue}
            setHourValue={setHourValue}
            setMinuteValue={setMinuteValue}
            setDateValue={setDateValue} />
        </div>
        <div className="PeopleNumBox">
          <Peoplenum setPeopleNumValue={setPeopleNumValue}/>
        </div>
        <div className="GenderBox">
          <GenderList setGenderValue={setGenderValue} />
        </div>
        <div className="LineBox"><Line /></div>
        <div className="PlaceBox">
          <Place setPositionValue={setPositionValue} setPlacenameValue={setPlacenameValue}/>
        </div>
        <div className="PostTitleBox">
          <PostTitle setTitleValue={setTitleValue}/>
        </div>
        <div className="PostContentsBox">
          <PostContents setContentsValue={setContentsValue}/>
        </div> 
        <div className="SendBox">
          <PostSend
            titlevalue={titlevalue} 
            contentvalue = {contentvalue}
            noonvalue = {noonvalue}
            hourvalue = {hourvalue}
            minutevalue = {minutevalue}
            peoplenumvalue = {peoplenumvalue}
            datevalue = {datevalue}
            purposevalue = {purposevalue} 
            gendervalue = {gendervalue} 
            positionvalue = {positionvalue}
            placenamevalue = {placenamevalue}/>
        </div>
      </div>
    </CreatePostBox>
    
  );
}

export default CreatePost;