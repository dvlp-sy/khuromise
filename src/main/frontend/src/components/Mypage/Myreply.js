import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Routes, Link, useNavigate } from "react-router-dom";

const Mypagecontainer = styled.div`
    width: 100%;
    height: 23rem;
`
const Mypagebox = styled.div`
    width: 61rem;
    height: 20rem;
    box-shadow: 0 0 8px 0 #bcbcbc;
    border-radius: 16px;
    margin: 3rem auto 0;
    display: grid;
    grid-template-columns: 13rem 16rem 16rem 16rem;
    grid-template-rows: 4rem 6rem 10rem;

    .item: nth-child(1) {
        grid-column : 1/2;
        grid-row: 1/3;
        border-right: 1px solid #bcbcbc;
        border-bottom: 1px solid #bcbcbc;
    }
    .item: nth-child(2) {
        grid-column: 1/2;
        grid-row: 3/4;
        border-right: 1px solid #bcbcbc;
    }
    .item: nth-child(3) {
        grid-column: 2/5;
        grid-row: 1/2;
        border-bottom: 1px solid #bcbcbc;
        margin: 1px;
    }
    .item: nth-child(4) {
        grid-column: 2/5;
        grid-row:2/4;
    }
`
const Buttonstyle = styled.button`
    width : 31%;
    height: 4em;
    border: 1px solid #bcbcbc;
    border-radius: 10px;
    margin-left: 10px;
    margin-top: 4px;
    cursor: Pointer;
    text-align : center;
`
const Button2 = styled.button`
    width: 10rem;
    height: 3rem;
    border: 1px solid #bcbcbc;
    border-radius: 10px;
    cursor: Pointer;
    margin-left: 22px;
    margin-top: 20px;
`
const Comment = styled.div`
    width: 43rem;
    height: 4rem;
    border: 1px solid #bcbcbc;
    border-radius: 10px;
    margin : 8px 2.5rem;
    display: inline-flex;
`

function Myreply () {
    const navigate = useNavigate();
    const onClick =()=>{
        sessionStorage.removeItem("LoginUserInfo");
        navigate(`/`);
        window.location.reload();
    }
    return (
        <div>
            <Mypagecontainer>
                <Mypagebox>
                    <div className="item">1</div>
                        <div className="item">
                            <Button2>회원탈퇴</Button2>
                            <Button2 onClick={onClick}>로그아웃</Button2>
                    </div>
                    <div className="item">
                        <Buttonstyle onClick={()=>{
                            navigate('/mypage/mypostlist');
                        }}>나의 게시글</Buttonstyle>
                        <Buttonstyle onClick={()=>{
                            navigate('/mypage/myreply');
                        }}>나의 댓글</Buttonstyle>
                        <Buttonstyle onClick={()=>{
                            navigate('/mypage/mypromise');
                        }}>약속 목록</Buttonstyle>
                    </div>
                    <div className="item">
                        <Comment></Comment>
                        <Comment></Comment>
                        <Comment></Comment>
                    </div>
                </Mypagebox>
            </Mypagecontainer>
        </div>
    )
}

export default Myreply;