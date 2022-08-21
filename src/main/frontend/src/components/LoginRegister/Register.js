import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router";
import icon from "./../Header/icon.png";
import config from "./config.js";

const RegisterTemplate = styled.div`
  width: 380px;
  height: auto;
  margin: 50px auto;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 #bcbcbc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .head {
    text-align: right;
  }
  td {
    padding: 5px;
  }
  input {
    width: 160px;
    height: 26px;
    margin: 0px;
    border: 1px solid #bcbcbc;
    border-radius: 6px;
  }
  .dateInput {
    width: 163px;
    height: 28px;
  }
  .genderbox {
    width: 70px;
    margin: 0;
    display: flex;
    align-items: center;
  }
  .genderboxbox {
    width: 100px;
  }
  button {
    width: 70px;
    height: 30px;
    font-size: 14px;
    border: 1px solid #bcbcbc;
    border-radius: 6px;
    background-color: #f9fafb;
    cursor: pointer;
  }
  .genderButton {
    width: 50px;
    height: 20px;
    font-size: 14px;
    cursor: pointer;
    line-height: 20px;
  }
  .emailInput {
    width: 88px;
    height: 26px;
    margin: 0px;
    border: 1px solid #bcbcbc;
  }
  .registerButton {
    width: 150px;
    height: 50px;
    margin-top: 30px;
    font-size: 20px;
    background-color: #f9fafa;
    cursor: pointer;
  }
  .greenText {
    font-size: 12px;
    color: green;
  }
  .redText {
    font-size: 12px;
    color: red;
  }
  .counter {
    font-size: 12px;
    color: red;
    text-align: right;
  }
  .pw {
    -webkit-text-security: disc;
  }
  select {
    margin-right: 1px;
  }
`;

const Logo = styled.img`
  width: 200px;
  height: 90px;
  margin-bottom: 40px;
`;

const Register = () => {
  const [id, setId] = useState(null);
  const [idShort, setIdShort] = useState(null);
  const [pw, setPw] = useState(null);
  const [_pw, set_Pw] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState("");
  const [canEmail, setCanEmail] = useState(null);
  const [check, setCheck] = useState(null);
  const [isCerti, setIsCerti] = useState(null);
  const [certification, setCertification] = useState(null);

  const idRef = useRef(null);
  const pwRef = useRef(null);
  const _pwRef = useRef(null);
  const nameRef = useRef(null);
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const emailRef = useRef(null);
  const checkRef = useRef(null);

  const idChange = () => {
    setId(String(idRef.current.value));
    setCanId(null);
  };
  const pwChange = () => {
    setPw(String(pwRef.current.value));
  };
  const _pwChange = () => {
    set_Pw(String(_pwRef.current.value));
  };
  const nameChange = () => {
    setName(String(nameRef.current.value));
  };
  const yearChange = () => {
    setYear(String(yearRef.current.value));
  };
  const monthChange = () => {
    setMonth(String(monthRef.current.value));
  };
  const dayChange = () => {
    setDay(String(dayRef.current.value));
  };
  const emailChange = () => {
    setCanEmail(null);
    setEmail(String(emailRef.current.value));
  };
  const checkChange = () => {
    setCheck(String(checkRef.current.value));
  };

  //ID 중복확인
  const users = useFetch(`/api/users`);
  console.log({certification,id, pw, _pw, name});
  const [canId, setCanId] = useState(null);

  const idCheckClick = () => {
    if (id !== null) {
      if (id.length >= 6) {
        for (const user of users) {
          if (user.userid === id) {
            setCanId(false);
            setIdShort(false);
            break;
          } else {
            setCanId(true);
            setIdShort(false);
          }
        }
      } else {
        setCanId(null);
        setIdShort(true);
      }
    } else {
      setCanId(null);
      alert("아이디를 입력해주세요.");
    }
  };

  // 생년월일
  const startYear = 1980;
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();
  const yearList = [];
  const monthList = [];
  const dayList = [];
  const endDayList = [29, 30, 31];
  const [year, setYear] = useState(todayYear);
  const [month, setMonth] = useState(todayMonth);
  const [day, setDay] = useState(todayDay);

  for (let y = startYear; y <= todayYear; y++) {
    yearList.push(y);
  }
  for (let m = 1; m <= 12; m++) {
    m < 10 ? monthList.push(m) : monthList.push(m);
  }
  for (const endDay of endDayList) {
    const list = [];
    for (let day = 1; day <= endDay; day++) {
      day < 10 ? list.push(day) : list.push(day);
    }
    dayList.push(list);
  }

  const month29 = ["2"];
  const month30 = ["4", "6", "9", "11"];
  const [selectDayList, setSelectDayList] = useState(dayList[0]);

  useEffect(() => {
    if (month29.includes(month)) {
      setSelectDayList(dayList[0]);
    } else if (month30.includes(month)) {
      setSelectDayList(dayList[1]);
    } else {
      setSelectDayList(dayList[2]);
    }
  }, [month]);

  // 이메일 인증
  const checkEmail = () => {
    if (email !== null) {
      for (const user of users) {
        if (user.useremail === email+"@khu.ac.kr") {
          setCanEmail(false);
          break;
        } else {
          setCanEmail(true);
        }
      }
    } else {
      alert("이메일을 입력해주세요.");
    }
  };

  const [min, setMin] = useState(3);
  const [sec, setSec] = useState("00");
  const time = useRef(180);
  const timerId = useRef(null);

  useEffect(() => {
    if (time.current < -1) {
      clearInterval(timerId.current);
      time.current = 180;
      setIsCerti(false);
      alert("유효시간이 지났습니다.\n다시 인증해주세요.");
    }
  }, [sec]);

  const numRef = useRef(null);
  const sendEmail = () => {
    if (canEmail) {
      timerId.current = setInterval(() => {
        setMin(parseInt(time.current / 60));
        const _sec = time.current % 60;
        setSec(_sec < 10 ? "0" + _sec : _sec);
        time.current -= 1;
      }, 1000);

      let number = Math.floor(Math.random() * 1000000) + 100000;
      if (number > 999999) {
        number = number - 100000;
      }
      numRef.current = number;
      console.log(numRef.current);

      // emailjs.init(config.PUBLIC_KEY);
      // const templateParams = {
      //   name: name,
      //   email: email + "@khu.ac.kr",
      //   number: number,
      // };
      // emailjs.send(config.SERVICE_ID, config.TEMPLATE_ID, templateParams);

      setIsCerti(true);
      alert("인증메일이 성공적으로 전송되었습니다.");
    } else {
      alert("이미 사용중인 이메일입니다.");
    }
  };

  const isNum = (e) => {
    const key = e.key;
    const availList = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Meta",
      "Alt",
      "Shift",
      "v",
    ];
    if ((key >= 0 && key < 10) || availList.includes(key)) {
      return true;
    } else {
      e.preventDefault();
    }
  };

  const checkNum = () => {
    if (check !== null) {
      if (numRef.current == check) {
        setCertification(true);
      } else {
        setCertification(false);
      }
    } else {
      alert("인증번호를 입력해주세요.");
    }
  };

  return (
    <RegisterTemplate>
      <Logo src={icon} />
      <form action="/api/users/reg" method="post" onSubmit="return checkSubmit()">
        <table>
          <tbody>
            <tr>
              <td className="head">아이디</td>
              <td>
                <input
                  name="userid"
                  ref={idRef}
                  onChange={idChange}
                  value={id || ""}
                  placeholder="아이디를 입력해주세요"
                  required
                />
              </td>
              <td>
                <div onClick={idCheckClick}>중복확인</div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {idShort && (
                  <span className="redText">
                    아이디는 6글자 이상이어야합니다.
                  </span>
                )}
                {canId !== null &&
                  (canId ? (
                    <span className="greenText">사용가능한 아이디입니다.</span>
                  ) : (
                    <span className="redText">이미 사용중인 아이디입니다.</span>
                  ))}
              </td>
            </tr>
            <tr>
              <td className="head">비밀번호</td>
              <td>
                <input
                  minLength="8"
                  className="pw"
                  type="password"
                  name="userpw"
                  ref={pwRef}
                  onChange={pwChange}
                  value={pw || ""}
                  placeholder="비밀번호를 입력해주세요"
                  required
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {pw &&
                  (pw.length < 8 ? (
                    <span className="redText">비밀번호가 너무 짧습니다.</span>
                  ) : null)}
              </td>
            </tr>
            <tr>
              <td className="head">비밀번호 확인</td>
              <td>
                <input
                  className="pw"
                  type="password"
                  ref={_pwRef}
                  onChange={_pwChange}
                  value={_pw || ""}
                  placeholder="비밀번호를 다시 입력해주세요"
                  required
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                {pw &&
                  _pw &&
                  (pw === _pw ? (
                    <span className="greenText">비밀번호가 일치합니다.</span>
                  ) : (
                    <span className="redText">
                      비밀번호가 일치하지 않습니다.
                    </span>
                  ))}
              </td>
            </tr>
            <tr>
              <td className="head">이름</td>
              <td>
                <input
                  name="username"
                  ref={nameRef}
                  onChange={nameChange}
                  value={name || ""}
                  placeholder="이름을 입력해주세요"
                  required
                />
              </td>
            </tr>
            <tr>
              <td className="head">성별</td>
              <td className="genderbox">
                <input
                  name="usergender"
                  className="genderButton"
                  type="radio"
                  value="m"
                  defaultChecked
                />
                남성
                <input
                  name="usergender"
                  className="genderButton"
                  type="radio"
                  value="w"
                />
                여성
                {/* <button
                className="genderButton"
                onClick={maleClick}
                style={{
                  backgroundColor: gender === "m" ? "#eaeaea" : "white",
                }}
              >
                남자
              </button>
              <button
                className="genderButton"
                onClick={femaleClick}
                style={{
                  backgroundColor: gender === "w" ? "#eaeaea" : "white",
                }}
              >
                여자
              </button> */}
              </td>
            </tr>
            <tr>
              <td className="head">생년월일</td>
              <td>
                <select
                  name="useryear"
                  ref={yearRef}
                  onChange={yearChange}
                  value={year || ""}
                  required
                >
                  {yearList.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </select>
                년
                <select
                  name="usermonth"
                  ref={monthRef}
                  onChange={monthChange}
                  value={month || ""}
                  required
                >
                  {monthList.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </select>
                월
                <select
                  name="userdate"
                  ref={dayRef}
                  onChange={dayChange}
                  value={day || ""}
                  required
                >
                  {selectDayList.map((day) => (
                    <option key={day}>{day}</option>
                  ))}
                </select>
                일
              </td>
            </tr>
            <tr>
              <td className="head">e-mail</td>
              <td>
                <div>
                  <input
                    name="useremail"
                    className="emailInput"
                    ref={emailRef}
                    onChange={emailChange}
                    value={email || ""}
                    placeholder="e-mail"
                    required
                    readOnly={isCerti ? true : false}
                  />
                  <span>@khu.ac.kr</span>
                </div>
              </td>
              <td>
                {canEmail ? (
                  isCerti || <div onClick={sendEmail}>전송하기</div>
                ) : (
                  <div onClick={checkEmail}>중복확인</div>
                )}
              </td>
            </tr>
            {isCerti ? (
              <tr>
                <td className="counter">
                  {min}:{sec}
                </td>
                <td>
                  <input
                    maxLength="6"
                    placeholder="인증번호를 입력해주세요"
                    onKeyDown={isNum}
                    ref={checkRef}
                    onChange={checkChange}
                    required
                  />
                </td>
                <td>
                  <div onClick={checkNum}>인증하기</div>
                </td>
              </tr>
            ) : (
              canEmail !== null &&
              (canEmail ? (
                <tr>
                  <td></td>
                  <td className="greenText">사용가능한 이메일입니다.</td>
                </tr>
              ) : (
                <tr>
                  <td></td>
                  <td className="redText">이미 사용중인 이메일입니다.</td>
                </tr>
              ))
            )}
            {certification ? (
              <tr>
                <td></td>
                <td className="greenText">인증이 완료되었습니다.</td>
              </tr>
            ) : (
              certification === false && (
                <tr>
                  <td></td>
                  <td className="redText">인증번호가 일치하지 않습니다.</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <input
          type="submit"
          className="registerButton"
          value="회원가입"
          disabled={canId &&
              pw === _pw &&
              name &&
              certification ? false : true}
        />
      </form>
    </RegisterTemplate>
  );
};

export default Register;