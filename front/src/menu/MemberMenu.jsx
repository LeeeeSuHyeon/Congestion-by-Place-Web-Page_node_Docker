// menu/MemberMenu.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const MemberMenu = ({ name, licence, setLoginInfo, fetchUserView }) => {
  const navigate = useNavigate();

  // 사용자가 매장 조회 메뉴를 클릭할 때 호출되는 함수
  const handleLinkClick = (vu, licence) => {
    fetchUserView(vu, licence);
  };

  // 로그아웃 버튼 클릭 시 호출되는 함수
  const handleLogout = () => {
     // 로그아웃 확인 다이얼로그
    if (window.confirm('로그아웃 하시겠습니까?')) {
      // 세션 스토리지의 login 값을 'false'로 설정하여 로그아웃
      window.sessionStorage.setItem('login', 'false');
      setLoginInfo(false);  // 상태 업데이트
      navigate('/');        // 홈 화면으로 이동 
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: '#4facee' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

             {/* 내 가게 조회 메뉴 */}
            <li className="nav-item">
              <Link className="nav-link" to={`/shop/view/v/${licence}`} style={{ color: 'white' }} onClick={()=>handleLinkClick('v', licence)}>
                내 가게
              </Link>
            </li>
              {/* 내 가게 수정 메뉴 */}
            <li className="nav-item">
              <Link className="nav-link" to={`/shop/view/u/${licence}`} style={{ color: 'white' }} onClick={()=>handleLinkClick('u', licence)}>
                내 가게 수정
              </Link>
            </li>
             {/* 가게 등록 메뉴 */}
            <li className="nav-item">
              <Link className="nav-link" to="/shop/create" style={{ color: 'white' }}>
                가게 등록
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav">
            
            {/* 사용자 정보 표시 */}
            <li className="nav-item">
              <span className="nav-link" style={{ fontWeight: 'bold', marginRight: '10px', color: 'white' }}>
                {name} ({licence})
              </span>
            </li>

             {/* 로그아웃 버튼 */}
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/auth/logout_process"
                style={{ color: '#4facee', backgroundColor: 'white' }}
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                로그아웃
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default MemberMenu;
