import React, { useState } from 'react';
import styled from "styled-components";
import ModMap from './ModMap';

const PlaceBox = styled.div`
  width : 95%;
  height : 450px;
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
`;

const SearchBox = styled.div`
  width : 90%;
  height : 8%;
  display : flex;
  margin : 2px;

  input {
    border : 1px solid #bcbcbc;
    width : 90%;
    height : 30px;
  }

  button {
    border : 1px solid #bcbcbc;
    width : 10%;
    height : 34px;
  }
`;

const MapBox = styled.div`
  width : 90%;
  height : 400px;
  display : flex;
`;


function ModPlace(props) {

  const { setLatValue, setLonValue, setPlacenameValue, mypost } = props;
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  
  const onChange = (e) => {
    setInput(e.target.value);
  }

  const onClick = (e) => {
    e.preventDefault();
    setSearch(input);
    setInput('');
  }

  return (
    <PlaceBox>
      <SearchBox>
        <input value={input} onChange={onChange}/>
        <button onClick={onClick}>검색</button>
      </SearchBox>
      <MapBox>
        <ModMap searchPlace={search} setLatValue={setLatValue} setLonValue={setLonValue} setPlacenameValue={setPlacenameValue} mypost={mypost} />
      </MapBox>
    </PlaceBox>
  );
}

export default ModPlace;