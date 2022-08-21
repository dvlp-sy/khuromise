import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
const { kakao } = window;

function PostMap() {
  const { id } = useParams(); 
  const post = useFetch(`/api/posts/id/${id}`);
  const lat = Number(post.lat) || 0;
  const lon = Number(post.lon) || 0;
  console.log(lat,lon);

  useEffect(()=> {
    const container = document.getElementById("Map");
    
    const options = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);

    const markerPosition  = new kakao.maps.LatLng(lat, lon); 
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
    
  },[lat, lon]);

  return( 
    <div id='Map'
      style={{
        height: '400px',
        width : '400px',
        border: '1px solid #bcbcbc',
        margin: '0 auto',
        marginBottom: '10px'
      }} 
    ></div>
  );
}

export default PostMap;