// App.js

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CustomerMenu from './menu/CustomerMenu';
import MemberMenu from './menu/MemberMenu';
import ShopInfo from './body/ShopInfo';
import Login from './body/Login';
import Register from './body/Register';
import ShopCU from './body/ShopCU';

const url = 'http://192.168.64.8:7080';
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

  const [data, setData] = useState([]);
  const [maxShopId, setMaxShopId] = useState(0);


  // 서버로부터 홈 정보를 가져오는 비동기 함수
  const fetchLoginInfo = async () => {
    try {
      const response = await fetch(url + '/'); // 서버에서 로그인 정보를 얻는 엔드포인트 경로에 맞게 수정
      const data = await response.json();
      console.log('fetchLoginInfo : ', data);

      // shop_id 값이 들어있는 배열 생성
      const shopIds = data.shops.map((shop) => shop.shop_id);
      console.log(Math.max(...shopIds));
      setData(data);
      setMaxShopId(Math.max(...shopIds)); // shop_id의 최댓값 추출
      
    } catch (error) {
      console.error('Error fetching login info:', error);
    }
  };

  // 서버로부터 로그인 jsx 가져오는 비동기 함수
  const fetchLogin = async () => {
    try {
      const response = await fetch(url + '/auth/login'); // 서버에서 로그인 정보를 얻는 엔드포인트 경로에 맞게 수정
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoginInfo(data.menu === 'menuForMember');
    } catch (error) {
      console.error('Error fetching login info:', error);
    }
  };

  const fetchCutomerViewData = async (locationOrCategory, id) => {
    try {
      const response = await fetch(url + `/shop/customerView/${locationOrCategory}/${id}`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log(data);
      } else {
        console.error('Error fetching data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCreateUpdate = async (id) => {
    try {
      const response = await fetch(id ? `${url}/shop/update/${id}` : `${url}/shop/create`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log(data);
      } else {
        console.error('Error fetching data:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentPath === '/') {
          await fetchLoginInfo();
        } else if (currentPath === '/auth/login') {
          await fetchLogin();
        } else if (currentPath.startsWith('/shop/customerView/')) {
          const [, , , locationOrCategory, id] = currentPath.split('/');
          await fetchCutomerViewData(locationOrCategory, parseInt(id));
        } else if (currentPath === '/shop/create' || currentPath.startsWith('/shop/update')) {
          const [, , id] = currentPath.split('/');
          await fetchCreateUpdate(id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPath]);

  return (
    <Router>
      <div style={{ paddingTop: '90px' }}>
        {loginInfo ? (
          <MemberMenu name={data.name} licence={data.licence} setLoginInfo={setLoginInfo} />
        ) : (
          <CustomerMenu fetchCutomerViewData = {fetchCutomerViewData}/>
        )}

        <Routes>
          <Route path="/" element={
            <div className="container">
              <ShopInfo shops={data.shops} update={data.update} />
            </div>
          } />
          <Route path="/auth/login" element={
            <div className="container">
              <Login setData={setData} setLoginInfo={setLoginInfo} />
            </div>
            } />
          <Route path="/auth/register" element={
            <div className="container">
              <Register />
            </div>
           } />
          <Route path="/create" element={loginInfo ? (
            <div className="container">
              <ShopCU shops={data.shops} update={data.update} />
            </div>
            ) : (
              <Navigate to="/auth/login" />
          )} />
          <Route path="/update" element={loginInfo ? (
            <div className="container">
              <ShopCU shops={data.shops} update={data.update} />
            </div>
            ) : (
              <Navigate to="/auth/login" />
          )} />
          <Route
            path="/shop/customerView/:locationOrCategory/:id"
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
