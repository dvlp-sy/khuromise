import React, {useState} from 'react';
import styled from "styled-components";
import ModPurposeList from "./ModPurposeList";
import ModTime from "./ModTime";
import ModPlace from "./ModPlace";
import ModPeoplenum from "./ModPeoplenum";
import ModGenderList from "./ModGenderList";
import ModTitle from "./ModTitle";
import ModContents from "./ModContents";
import Line from "./ModLine";
import ModSend from './ModSend';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';

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
    padding : 10px;
    border : 1px solid #bcbcbc;
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

function ModifyPost() {

  const { id } = useParams();

  //const today = new Date();
  
  const mypost = useFetch(`/api/posts/id/${id}`);
  //const mypost = {...fetch[0]};
  console.log(mypost);

  const [titlevalue, setTitleValue] = useState();
  const [contentvalue, setContentsValue] = useState();
  const [noonvalue, setNoonValue] = useState();
  const [hourvalue, setHourValue] = useState();
  const [minutevalue, setMinuteValue] = useState();
  const [peoplenumvalue, setPeopleNumValue] = useState();
  const [datevalue, setDateValue] = useState();
  const [purposevalue, setPurposeValue] = useState();
  const [gendervalue, setGenderValue] = useState();
  //const [positionvalue, setPositionValue] = useState([37.2437815,127.0764067]);
  const [latvalue, setLatValue] = useState(37.2437815);
  const [lonvalue, setLonValue] = useState(127.0764067);
  const [placenamevalue, setPlacenameValue] = useState('경희대학교 국제캠퍼스');

  /*
  console.log(titlevalue);
  console.log(contentvalue);
  console.log(datevalue);
  console.log(noonvalue);
  console.log(hourvalue);
  console.log(minutevalue);
  console.log(peoplenumvalue);
  console.log(purposevalue);
  console.log(gendervalue);
  console.log(latvalue);
  console.log(lonvalue);
  console.log(placenamevalue);
  */


  return (
    <CreatePostBox>
      <div className="CreatePost">
        <div className="PurposeListBox">
          <ModPurposeList setPurposeValue = {setPurposeValue} mypost = {mypost} />
        </div>
        <div className="PromTimeBox">
          <ModTime setNoonValue={setNoonValue}
            setHourValue={setHourValue}
            setMinuteValue={setMinuteValue}
            setDateValue={setDateValue} 
            mypost = {mypost}/>
        </div>
        <div className="PeopleNumBox">
          <ModPeoplenum setPeopleNumValue={setPeopleNumValue} mypost={mypost} />
        </div>
        <div className="GenderBox">
          <ModGenderList setGenderValue={setGenderValue} mypost = {mypost} />
        </div>
        <div className="LineBox"><Line /></div>
        <div className="PlaceBox">
          <ModPlace setLatValue={setLatValue} setLonValue={setLonValue} setPlacenameValue={setPlacenameValue} mypost = {mypost} />
        </div>
        <div className="PostTitleBox">
          <ModTitle setTitleValue={setTitleValue} mypost = {mypost} />
        </div>
        <div className="PostContentsBox">
          <ModContents setContentsValue={setContentsValue} mypost = {mypost}/>
        </div> 
        <div className="SendBox">
          <ModSend
            titlevalue={titlevalue} 
            contentvalue = {contentvalue}
            noonvalue = {noonvalue}
            hourvalue = {hourvalue}
            minutevalue = {minutevalue}
            peoplenumvalue = {peoplenumvalue}
            datevalue = {datevalue}
            purposevalue = {purposevalue} 
            gendervalue = {gendervalue}
            latvalue = {latvalue}
            lonvalue = {lonvalue}
            placenamevalue = {placenamevalue} />
        </div>
      </div>
    </CreatePostBox>
    
  );
}

export default ModifyPost;