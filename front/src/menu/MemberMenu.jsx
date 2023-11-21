// MemberMenu.js 
import React from 'react';
import { useNavigate } from 'react-router-dom';

const MemberMenu = ({name, licence, setLoginInfo}) => {
  const navigate = useNavigate();


  const handleLogout = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      setLoginInfo(false);
      navigate('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: '#4facee' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Home</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <a className="nav-link" href={`/shop/view/v/${licence}`} style={{ color: 'white' }}>내 가게</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href={`/shop/view/u/${licence}`} style={{ color: 'white' }}>내 가게 수정</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/shop/create" style={{ color: 'white' }}>가게 등록</a>
            </li>
          </ul>
          
            <ul className="navbar-nav">
              <li className="nav-item">
                <span className="nav-link" style={{ fontWeight: 'bold', marginRight: '10px', color: 'white' }}>{name} ({licence})</span>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/auth/logout_process" style={{ color: '#4facee', backgroundColor: 'white' }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}>
                  로그아웃
                </a>
              </li>
            </ul>

        </div>
      </div>
    </nav>
  );
};

export default MemberMenu;
