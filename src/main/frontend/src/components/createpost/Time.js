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
          <option>01</option>
          <option>02</option>
          <option>03</option>
          <option>04</option>
          <option>05</option>
          <option>06</option>
          <option>07</option>
          <option>08</option>
          <option>09</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>
      </TimeInputBox>
      <TimeInputBox>
        <select ref={minuteRef} onChange={onChange3}>
          <option>00</option>
          <option>05</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>25</option>
          <option>30</option>
          <option>35</option>
          <option>40</option>
          <option>45</option>
          <option>50</option>
          <option>55</option>
        </select>
      </TimeInputBox>
    </TimeBox>
  );
}

export default Time;