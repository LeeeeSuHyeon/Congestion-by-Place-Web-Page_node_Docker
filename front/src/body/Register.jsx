import React from 'react';

const Register = () => {
  // 등록 폼 렌더링
  return (
    <div className="container">
      <h2>사업자 등록</h2>
      {/* 회원가입 form */}
      <form action="http://192.168.64.8:7080/auth/register_process" method="post">
        {/* 아이디 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            아이디
          </label>
          <input className="form-control" type="text" name="loginid" style={{ width: '300px' }} />
        </div>
         {/* 비밀번호 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            비밀번호
          </label>
          <input className="form-control" type="text" name="password" style={{ width: '300px' }} />
        </div>
        {/* 사용자 이름 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            사용자 이름
          </label>
          <input className="form-control" type="text" name="name" style={{ width: '300px' }} />
        </div>
        {/* 주소 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            주소
          </label>
          <input className="form-control" type="text" name="address" style={{ width: '300px' }} />
        </div>
         {/* 전화번호 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            전화번호
          </label>
          <input className="form-control" type="text" name="tel" style={{ width: '300px' }} />
        </div>
         {/* 생년월일 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            생년월일
          </label>
          <input className="form-control" type="text" name="birth" style={{ width: '300px' }} />
        </div>
        {/* 사업자 등록번호 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            사업자 등록번호
          </label>
          <input className="form-control" type="text" name="licence" style={{ width: '300px' }} />
        </div>
        {/* 회원가입 버튼 */}
        <button className="btn btn-outline-primary btn-sm" type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Register;
