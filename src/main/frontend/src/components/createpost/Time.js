import React, {useRef} from 'react';
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

function Time(props) {
  
  const dateRef = useRef(null);
  const noonRef = useRef(null);
  const hourRef = useRef(null);
  const minuteRef = useRef(null);

  const onChange1 = () => {
    props.setNoonValue(noonRef.current.value);
  };

  const onChange2 = () => {
    props.setHourValue(hourRef.current.value);
  };

  const onChange3 = () => {
    props.setMinuteValue(minuteRef.current.value);
  };

  const onChange4 = () => {
    props.setDateValue(dateRef.current.value);
  };

  const hourList = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
  const minuteList = ["00", "05", "10", "15", "20", "25", "30", "35", "40"];

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
            padding : '3px'}}/>
      </DateInputBox>
      <TimeInputBox>
        <select ref={noonRef} onChange={onChange1}>
          <option>오전</option>
          <option>오후</option>
        </select>
      </TimeInputBox>
      <TimeInputBox>
        <select ref={hourRef} onChange={onChange2}>
          {hourList.map((hour)=><option key={hour}>{hour}</option>)}
        </select>
      </TimeInputBox>
      <TimeInputBox>
        <select ref={minuteRef} onChange={onChange3}>
          {minuteList.map((minute)=><option key={minute}>{minute}</option>)}
        </select>
      </TimeInputBox>
    </TimeBox>
  );
}

export default Time;