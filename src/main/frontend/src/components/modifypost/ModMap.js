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

function ModMap({ searchPlace, setLatValue, setLonValue, setPlacenameValue, mypost }) {

  const [searchLat, setSearchLat] = useState(37.2437815);
  const [searchLon, setSearchLon] = useState(127.0764067);
  const [searchdata, setSearchdata] = useState([]);
  const [initialLat, setInitialLat] = useState(37.2437815);
  const [initialLon, setInitialLon] = useState(127.0764067);

  const savedLat = Number(mypost.lat) || 37.2437815;
  const savedLon = Number(mypost.lon) || 127.0764067;
  const savedPlaceName = mypost.placename;
  
  useEffect(() => {
    setSearchLat(savedLat);
    setSearchLon(savedLon);
    setInitialLat(savedLat);
    setInitialLon(savedLon);
    setLatValue(savedLat);
    setLonValue(savedLon);
    setPlacenameValue(savedPlaceName);
  },[savedLat, savedLon, savedPlaceName]);
    
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

    const markerPosition  = new kakao.maps.LatLng(initialLat, initialLon); 
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);

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

export default ModMap;