import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';

const TimeBox = styled.div`
  display : flex;
  justify-content : center;
`;

const DateInputBox = styled.div`
  width : 50%;
  height : 100%;
  display : flex;
  justify-content : center;
`;

const TimeInputBox = styled.div`
  display : flex;
  justify-content : center;
`;

function ModTime(props) {

  const hourList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const minuteList = ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "60"];

  const { mypost } = props;
  const { date, noon, hour, minute} = mypost;
  
  const dateRef = useRef();
  const noonRef = useRef();
  const hourRef = useRef();
  const minuteRef = useRef();

  const [dateState, setDate] = useState('');
  const [noonState, setNoon] = useState('');
  const [hourState, setHour] = useState('');
  const [minuteState, setMinute] = useState('');
  
  useEffect(() => {
    setDate(date);
    setNoon(noon);
    setHour(hour);
    setMinute(minute);
    props.setDateValue(date);
    props.setNoonValue(noon);
    props.setHourValue(mypost.hour);
    props.setMinuteValue(mypost.minute);
  },[date, noon, hour, minute]);
  
  

  const onChange1 = (e) => {
    setNoon(e.target.value);
    props.setNoonValue(noonRef.current.value);
  };

  const onChange2 = (e) => {
    setHour(e.target.value);
    props.setHourValue(hourRef.current.value);
  };

  const onChange3 = (e) => {
    setMinute(e.target.value);
    props.setMinuteValue(minuteRef.current.value);
  };

  const onChange4 = (e) => {
    setDate(e.target.value);
    props.setDateValue(dateRef.current.value);
  };

  return (
    <TimeBox>
      <DateInputBox>
        <input
          ref={dateRef}
          onChange={onChange4}
          type='date'
          style={{
            width : '90%',
            height : '20px',
            fontSize : '15px',
            borderStyle : 'double',
            padding : '3px'}}
            value = {dateState || ''} />
      </DateInputBox>
      <TimeInputBox>
        <select ref={noonRef} onChange={onChange1} value={noonState}>
          <option value='오전'>오전</option>
          <option value='오후'>오후</option>
        </select>
      </TimeInputBox>
      <TimeInputBox>
        <select ref={hourRef} onChange={onChange2} value={hourState}>
          {hourList.map((hour)=><option key={hour}>{hour}</option>)}
        </select>
      </TimeInputBox>
      <TimeInputBox>
        <select ref={minuteRef} onChange={onChange3} value={minuteState}>
          {minuteList.map((minute)=><option key={minute}>{minute}</option>)}
        </select>
      </TimeInputBox>
    </TimeBox>
  );
}

export default ModTime;