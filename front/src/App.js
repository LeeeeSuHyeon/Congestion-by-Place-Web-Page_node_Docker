// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomerMenu from './menu/CustomerMenu.jsx';
import MemberMenu from './menu/MemberMenu.jsx';
import ShopInfo from './body/ShopInfo.jsx';
import Login from './body/Login.jsx';
import Register from './body/Register.jsx';
import ShopCU from './body/ShopCU.jsx';

// 서버 주소
const url = 'http://192.168.64.8:7080';

// 현재 경로
const currentPath = window.location.pathname;

const App = () => {
  // sessionLogin 저장된 login 값을 가져옴
  const sessionLogin = window.sessionStorage.getItem("login");

  // sessionLogin 값이 "true"일 때는 true
  const initialLoginState = sessionLogin === "true";

  // login 값이 바뀔때마다 상태 관리
  const [loginInfo, setLoginInfo] = useState(initialLoginState);
  console.log('loginInfo : ', loginInfo)

  // login 값이 바뀔 때마다 sessionStorage의 값도 변경하기
  useEffect(() => {
    window.sessionStorage.setItem("login", loginInfo.toString());
  }, [loginInfo]);

  // 서버에서 받은 데이터 모두 저장
  const [data, setData] = useState([]);

  // shop 정보 update, delete 시 서버 url에 shop_id가 포함되어 순환하기 위해 
  const [maxShopId, setMaxShopId] = useState(0);


  // 서버로부터 홈 정보를 가져오는 비동기 함수
  const fetchLoginInfo = async () => {
    try {
      const response = await fetch(url + '/'); 
      const data = await response.json();
      console.log('fetchLoginInfo : ', data);

      // shop_id 값이 들어있는 배열 생성
      const shopIds = data.shops.map((shop) => shop.shop_id);
      console.log(Math.max(...shopIds));
      setData(data);

      // shop_id의 최댓값 추출 -> update 시, 서버 주소에 shop_id가 포함되는데 서버의 주소를 순환하기 위해 
      setMaxShopId(Math.max(...shopIds)); 
      
    } catch (error) {
      console.error('Error fetching login info:', error);
    }
  };

  // 서버로부터 로그인 화면을 가져오는 비동기 함수
  const fetchLogin = async () => {
    try {
      const response = await fetch(url + '/auth/login'); 
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoginInfo(data.menu === 'menuForMember');
    } catch (error) {
      console.error('Error fetching login:', error);
    }
  };

  // 비로그인 고객이 지역, 카테고리 별 매장 정보를 가져오는 비동기 함수
  const fetchCutomerViewData = async (locationOrCategory, id) => {
    try {
      const response = await fetch(url + `/shop/customerView/${locationOrCategory}/${id}`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log(data);
      } else {
        console.error('Error fetchCutomerViewData:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetchCutomerViewData:', error);
    }
  };

  // 로그인 유저가 자신의 매장을 view, update 가 가능한 페이지 정보를 가져오는 비동기 함수
  const fetchUserView = async (vu, licence) => {
    try {
      const response = await fetch(`${url}/shop/view/${vu}/${licence}`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log('fetchUserView: ', data);
      } else {
        console.error('Error fetchUserView:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetchUserView:', error);
    }
  };

  // 로그인 유저가 새로운 매장을 입력하거나, 기존의 매장을 update하는 페이지를 가져오는 비동기 함수 
  const fetchCreateUpdate = async (id) => {
    try {
      const response = await fetch(id ? `${url}/shop/update/${id}` : `${url}/shop/create`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log(data);
      } else {
        console.error('Error fetchCreateUpdate:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetchCreateUpdate:', error);
    }
  };

  // 현재 경로가 변경될 때마다 경로에 따른, 비동기 함수들을 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentPath === '/') {
          await fetchLoginInfo();
        } 
        else if (currentPath === '/auth/login') {
          await fetchLogin();
        } 
        else if (currentPath.startsWith('/shop/view/')) {
          const [, , , vu, licence] = currentPath.split('/');
          console.log('vu, licence', vu, licence)
          await fetchUserView(vu, licence);
        } 
        else if (currentPath.startsWith('/shop/customerView/')) {
          const [, , , locationOrCategory, id] = currentPath.split('/');
          await fetchCutomerViewData(locationOrCategory, parseInt(id));
        } 
        else if (currentPath === '/shop/create' || currentPath.startsWith('/shop/update')) {
          const [, , id] = currentPath.split('/');
          await fetchCreateUpdate(id);
        }
      } catch (error) {
        console.error('Error fetchData:', error);
      }
    };

    fetchData();
  }, [currentPath]);

  return (
    <Router>
      <div style={{ paddingTop: '90px' }}>
        {loginInfo ? (
          // 로그인에 따른 회원 메뉴바 표시
          <MemberMenu name={data.name} licence={data.licence} setLoginInfo={setLoginInfo} fetchUserView={fetchUserView}/>
        ) : (
          // 고객 메뉴바 표시 
          <CustomerMenu fetchCutomerViewData = {fetchCutomerViewData}/>
        )}

        <Routes>
          {/* 홈 화면 */}
          <Route path="/" element={
            <div className="container">
              <ShopInfo shops={data.shops} update={data.update} />
            </div>
          } />

          {/* 로그인 화면 */}
          <Route path="/auth/login" element={
            <div className="container">
              <Login setData={setData} setLoginInfo={setLoginInfo} />
            </div>
            } />

          {/* 회원가입 화면 */}
          <Route path="/auth/register" element={
            <div className="container">
              <Register />
            </div>
           } />

           {/* 매장 생성 화면 */}
          <Route path="/create" element={loginInfo ? (
            <div className="container">
              <ShopCU shops={data.shops} update={data.update} />
            </div>
            ) : (
              <Navigate to="/auth/login" />
          )} />

          {/* 매장 수정 화면 */}
          <Route path="/update" element={loginInfo ? (
            <div className="container">
              <ShopCU shops={data.shops} update={data.update} />
            </div>
            ) : ( 
              // 비로그인 상태일시 로그인 페이지로 이동 
              <Navigate to="/auth/login" />
          )} />

          {/* 고객이 특정 매장을 조회하는 화면 */}
          <Route
            path="/shop/customerView/:locationOrCategory/:id"
            element={
              <div className="container">
                <ShopInfo shops={data.shops} update={data.update} />
              </div>
            }
          />

            {/* 로그인 유저가 자신의 매장을 조회하는 화면 */}
          <Route
            path="/shop/view/:vu/:licence"
            element={
              <div className="container">
                <ShopInfo shops={data.shops} update={data.update} />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
