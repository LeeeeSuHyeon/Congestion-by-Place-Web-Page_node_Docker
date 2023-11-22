// CustomerMenu.jsx

import React from 'react';
import { Link } from 'react-router-dom'; 

const CustomerMenu = ({fetchCutomerViewData}) => {
  
  // 지역, 카테고리와 select value를 이용해 원하는 매장을 검색하는 함수 
  const handleLinkClick = (locationOrCategory, id) => {
    fetchCutomerViewData(locationOrCategory, id);
  };
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: '#4facee' }}>
      <div className="container-fluid">
        {/* 홈 화면 이동 */}
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
            {/* 위치 드롭다운 시작 */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="true"
                style={{ color: 'white' }}
              >
                위치
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/">
                    전체 위치
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`/shop/customerView/location/1`} onClick={()=>handleLinkClick('location', 1)}>
                    교내
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`/shop/customerView/location/2`}onClick={()=>handleLinkClick('location', 2)}>
                    태평동
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`/shop/customerView/location/3`}onClick={()=>handleLinkClick('location', 3)}>
                    복정동
                  </Link>
                </li>
              </ul>
            </li>
            {/* 위치 끝 */}
            {/* 카테고리 드롭다운 시작 */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{ color: 'white' }}
              >
                카테고리
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/">
                    전체 카테고리
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={`/shop/customerView/category/1`} onClick={()=>handleLinkClick('category', 1)}>
                    음식점
                  </Link>
                </li>
                <li>
                <Link className="dropdown-item" to={`/shop/customerView/category/2`} onClick={()=>handleLinkClick('category', 2)}> 
                    카페
                  </Link>
                </li>
                <li>
                <Link className="dropdown-item" to={`/shop/customerView/category/3`} onClick={()=>handleLinkClick('category', 3)}>
                    헬스장
                  </Link>
                </li>
              </ul>
            </li>
            {/* 카테고리 끝 */}
          </ul>
          {/* 로그인 버튼  */}
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="/auth/login"
                style={{ color: '#4facee', backgroundColor: 'white', marginRight: '10px' }}
              >
                사업자 로그인
              </a>
            </li>
            {/* 회원가입 버튼 */}
            <li className="nav-item">
              <a
                className="nav-link"
                href="/auth/register"
                style={{ color: '#4facee', backgroundColor: 'white' }}
              >
                사업자 등록
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default CustomerMenu;
