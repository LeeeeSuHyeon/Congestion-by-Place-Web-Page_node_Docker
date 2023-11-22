// Login.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({setData, setLoginInfo}) => {

  // form 아이디와 비밀번호를 사용하기 위해 상태 변수 선언 
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');
  const navigate = useNavigate();

  // form Submit 함수 
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 서버로 로그인 정보 전송 
      const response = await fetch('http://192.168.64.8:7080/auth/login_process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({ id, pwd }),
        
      });
      // 로그인 응답 확인 
      console.log(JSON.stringify({ id, pwd }))
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        // 로그인 성공
        if (data.success) {
          // 세션 스토리지에 로그인 정보 저장
          window.sessionStorage.setItem("login", "true");
          setData(data);
          setLoginInfo(data.menu === 'menuForMember');
          // 로그인 성공 후 '/'로 이동
          navigate('/');
        } else {
          // 로그인 실패
          alert(data.message); // 실패 메시지를 알림으로 표시
        }
      } else {
        // 오류 응답 처리
        console.error('Error fetching login process:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching login process:', error);
    }
  };

  // 로그인 화면 렌더링
  return (
    <div className="container">
      <h2>사업자 로그인</h2>
      {/* 로그인 form */}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          {/* 아이디 입력 필드 */}
          <label className="form-label" htmlFor="id">
            아이디
          </label>
          <input
            className="form-control"
            type="text"
            name="id"
            id="id"
            style={{ width: '300px' }}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        {/* 비밀번호 입력 필드  */}
        <div className="mb-3">
          <label className="form-label" htmlFor="pwd">
            비밀번호
          </label>
          <input
            className="form-control"
            type="password"
            name="pwd"
            id="pwd"
            style={{ width: '300px' }}
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
         {/* 로그인 버튼 */}
        <button className="btn btn-outline-primary btn-sm" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
