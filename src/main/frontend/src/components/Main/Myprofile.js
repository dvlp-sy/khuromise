import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Profile = styled.div`
    width: auto;
    height: 100%;
    min-height: 200px;
    box-shadow: 0 0 8px 0 #bcbcbc;
    border-radius: 16px;
    display: grid;
    grid-template-columns: 50% 50%;
    grid-template-rows: 40% 60%;
    row-gap: 30px;
    margin-top: 10px;
    

    .Profileimg {
        width: 55%;
        height: 90%;
        border: 1px solid #bcbcbc;
        margin-top: 20px;
        margin-left: 50px;
    }
    .Nickname {
        width : 80%;
        height: 80%;
        border-bottom: 2px solid #bcbcbc;
    }

    .buttonbox1 {
        width: auto;
        height: auto;
        grid-column: 1/ 2;
        grid-row:2/3;
        display: flex;
    }
    .buttonbox2 {
        width: auto;
        height: auto;
        grid-column: 2/ 3;
        grid-row:2/3;
        display: flex;
        item-align: center;
    }
`
const StyleButton = styled.button`
    width: 80%;
    height: 50%;
    border: 2px solid #bcbcbc;
    border-radius: 8px;
    background-color: white;
    cursor: Pointer;
    margin-left: 17px;
`

//login 된 my profile 정보 나오게 만들기//

function Myprofile(props) {
    const { isLogin } = props;
    const navigate = useNavigate();

    const onClick1 = () => {
        if (isLogin === true) {
            navigate(`/createpost`);
            window.location.reload();
        }
        else {
            navigate(`/register`);
            window.location.reload();
        }
    }
    
    const onClick2 = () => {
        if (isLogin === true) {
            navigate(`/mypage`);
            window.location.reload();
        }
        else {
            navigate(`/login`);
            window.location.reload();
        }
    }

    return(
        <div>
            <Profile>
                <div className='buttonbox1'>
                    <StyleButton onClick={onClick1}>
                        {isLogin ? "약속하기":"회원가입"}
                    </StyleButton>
                </div>
                <div className='buttonbox2'>
                    <StyleButton onClick={onClick2}>
                        {isLogin ? "마이페이지":"로그인"}
                    </StyleButton>
                </div>
            </Profile>
        </div>
    );
}


export default React.memo(Myprofile);