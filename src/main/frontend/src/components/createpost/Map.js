import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
const { kakao } = window;

const PlaceListBox = styled.div`
  border : 1px solid #bcbcbc;
  width : 30%;
  margin-left : 1px;
  overflow : scroll;
`;

const SelectedPlaceBox = styled.div`
  border : 1px solid #bcbcbc;
  cursor : pointer;
  padding : 4px;
`;

function Map({ searchPlace, setLatValue, setLonValue, setPlacenameValue }) {

  const [searchLat, setSearchLat] = useState(37.243775684467);
  const [searchLon, setSearchLon] = useState(127.077798444509);
  const [searchdata, setSearchdata] = useState([]);
  const [initialLat, setInitialLat] = useState(37.243775684467);
  const [initialLon, setInitialLon] = useState(127.077798444509);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setSearchLat(lat);
        setSearchLon(lon);
        setInitialLat(lat);
        setInitialLon(lon);
      });
    }
  },[]);
    
  useEffect(()=> {
    const container = document.getElementById("Map");
    
    const options = {
      center: new kakao.maps.LatLng(searchLat, searchLon),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);

    const searchoptions = {
      location : new kakao.maps.LatLng(initialLat, initialLon),
      sort : kakao.maps.services.SortBy.DISTANCE
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchPlace, placesSearchCB, searchoptions);
    
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        setSearchdata(data);
        displayMarker();
      }
    }
      
    function displayMarker() {
      let marker = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(searchLat, searchLon),
      });
    }
    
  },[searchPlace, searchLat, searchLon]);
  
  const onClick = (data) => {
    setSearchLat(data.y);
    setSearchLon(data.x);
    setLatValue(data.y);
    setLonValue(data.x);
    setPlacenameValue(data.place_name);
  }
  
  function ShowList({data}) {
    return (
      <div onClick={() => onClick(data)}>
        <div style={{color : 'blue'}}>{data.place_name}</div>
        <div>{data.address_name}</div>
      </div>
    );
  }

  return(
    <>
      <div id='Map'
        style={{
          border : '1px solid #bcbcbc',
          width : '70%',
          marginRight : '1px'
        }} 
      ></div>
      <PlaceListBox>
        {searchdata.map((data) => 
          <SelectedPlaceBox key={data.id}>
            <ShowList data={data} key={data.id}/>
          </SelectedPlaceBox>)}
      </PlaceListBox>
    </>
  );
}

export default Map;