import React from 'react';
import styled from 'styled-components';
import Searchbutton from './Searchbutton.png';


const SearchContainer = styled.div`
    display: inline-flex;
    width: 120%;
    height: 4em;

    .Searchbox {
        width: 95%;
        height: 2.7rem;
        border-radius: 8px;
        box-shadow: 0 0 8px 0 #bcbcbc;
    }    

    .buttonbox {
        width : 13%;
        height: 43px;
        cursor: Pointer;
        border: 2px solid #bcbcbc;
        box-shadow: 0 0 8px 0 #bcbcbc;
    }
`
const Searchb = styled.img`
    width : 100%;
`



function Search() {
    
    return (
        <div>
            <SearchContainer>
                <div className="Searchbox">
                    <input style={{
                        width: '95%',
                        height: '88%',
                        border: '2px solid #bcbcbc',
                        padding: '3px',
                        fontSize: '15px'
                    }}
                    type="text"
                    placeholder='검색어를 입력하시오.' />
                </div>
                <div className='buttonbox'>
                    <Searchb src={Searchbutton} />
                </div>
            </SearchContainer>
        </div>
        );

}
        
export default Search;