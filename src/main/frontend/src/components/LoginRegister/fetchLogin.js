const fetchLogin = async({ inputId, inputPw }) => {
  const response = await fetch(`/api/users`);
  
  if (response.ok) {
    const usersInfo = await response.json();
    const userInfo = usersInfo.find((user) => user.userid === inputId)
    if (!userInfo) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
    else if (userInfo.userpw !== inputPw) {
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
    else {
      return userInfo;
    }
  }
  else {
    return alert("오류가 발생했습니다.\n 다시 시도해 주세요.");
  }
}


export default fetchLogin;