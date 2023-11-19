import React from 'react';

const Login = () => {
  return (
    <div className="container">
      <h2>사업자 로그인</h2>
      <form action="/auth/login_process" method="post">
        <div className="mb-3">
          <label className="form-label" htmlFor="id">아이디</label>
          <input className="form-control" type="text" name="id" id="id" style={{ width: '300px' }} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="pwd">비밀번호</label>
          <input className="form-control" type="password" name="pwd" id="pwd" style={{ width: '300px' }} />
        </div>
        <button className="btn btn-outline-primary btn-sm" type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
