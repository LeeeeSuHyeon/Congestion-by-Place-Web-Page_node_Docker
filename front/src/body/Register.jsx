import React from 'react';

const Register = () => {
  return (
    <div className="container">
      <h2>사업자 등록</h2>
      <form action="/auth/register_process" method="post">
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            아이디
          </label>
          <input className="form-control" type="text" name="loginid" style={{ width: '300px' }} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            비밀번호
          </label>
          <input className="form-control" type="text" name="password" style={{ width: '300px' }} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            사용자 이름
          </label>
          <input className="form-control" type="text" name="name" style={{ width: '300px' }} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            주소
          </label>
          <input className="form-control" type="text" name="address" style={{ width: '300px' }} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            전화번호
          </label>
          <input className="form-control" type="text" name="tel" style={{ width: '300px' }} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            생년월일
          </label>
          <input className="form-control" type="text" name="birth" style={{ width: '300px' }} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            사업자 등록번호
          </label>
          <input className="form-control" type="text" name="licence" style={{ width: '300px' }} />
        </div>

        <button className="btn btn-outline-primary btn-sm" type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Register;
