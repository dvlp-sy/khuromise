import React, { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
const { kakao } = window;

function PostMap() {
  const { id } = useParams(); 
  const posts = useFetch(`http://localhost:3002/posts?id=${id}`);
  const post = { ...posts[0] };
  const position = post.position || [];

  useEffect(()=> {
    const container = document.getElementById("Map");
    
    const options = {
      center: new kakao.maps.LatLng(position[0], position[1]),
      level: 3
    };
    const map = new kakao.maps.Map(container, options);

    const markerPosition  = new kakao.maps.LatLng(position[0], position[1]); 
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);
    
  },[position]);

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