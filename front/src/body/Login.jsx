// Login.js

import React, { useState } from 'react';

const Login = ({setData, setLoginInfo}) => {
  const [id, setId] = useState('');
  const [pwd, setPwd] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://192.168.64.8:7080/auth/login_process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // credentials: 'include', // 쿠키는 사용 x
        body: JSON.stringify({ id, pwd }),
        
      });
      console.log(JSON.stringify({ id, pwd }))
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        if (data.success) {
          // 로그인 성공
          setData(data);
          setLoginInfo(data.menu === 'menuForMember');
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

  return (
    <div className="container">
      <h2>사업자 로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
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
        <button className="btn btn-outline-primary btn-sm" type="submit">
          로그인
        </button>
      </form>
    </div>
  );
};

export default Login;
