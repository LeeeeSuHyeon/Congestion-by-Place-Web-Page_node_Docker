// App.js

import React, { useState, useEffect } from 'react';
import CustomerMenu from './menu/CustomerMenu';
import MemberMenu from './menu/MemberMenu';
import ShopInfo from './body/ShopInfo';
import Login from './body/Login';
import Register from './body/Register';
import ShopCU from './body/ShopCU';

import './App.css';

const url = 'http://192.168.64.8:7080';
const currentPath = window.location.pathname;

const App = () => {
  const [loginInfo, setLoginInfo] = useState(false);
  const [data, setData] = useState([]);
  const [shopsData, setShopsData] = useState(null);
  const [maxShopId, setMaxShopId] = useState(0);

  // 서버로부터 홈 정보를 가져오는 비동기 함수
  const fetchLoginInfo = async () => {
    try {
      const response = await fetch(url + '/'); // 서버에서 로그인 정보를 얻는 엔드포인트 경로에 맞게 수정
      const data = await response.json();
      console.log(data);

      // shop_id 값이 들어있는 배열 생성
      const shopIds = data.shops.map((shop) => shop.shop_id);
      console.log(Math.max(...shopIds));
      setData(data);
      setMaxShopId(Math.max(...shopIds)); // shop_id의 최댓값 추출
      setLoginInfo(data.menu === 'menuForMember');
      setShopsData(data.shops); // 받아온 가게 데이터를 state에 저장
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

  const fetchCutomerViewData = async (vu, id) => {
    try {
      const response = await fetch(url + `/shop/customerView/${vu}/${id}`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
        setShopsData(data.shops); // 받아온 가게 데이터를 state에 저장
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
        setShopsData(data.shops);
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
    <>
      <div style={{ paddingTop: '90px' }}>
        {loginInfo ? (
          <MemberMenu name={data.name} licence={data.licence} />
        ) : (
          <CustomerMenu />
        )}

        {!loginInfo && currentPath === '/' ? (
          <div className="container">
            <ShopInfo shops={shopsData} update={data.update} />
          </div>
        ) : (
          loginInfo &&
          (currentPath === '/create' || currentPath === '/update') ? (
            <div className="container">
              <ShopCU shops={shopsData} update={data.update} />
            </div>
          ) : (
            currentPath === '/auth/login' ? (
              <div className="container">
                <Login setData={setData} setLoginInfo={setLoginInfo}/>
              </div>
            ) : currentPath === '/auth/register' ? (
              <div className="container">
                <Register />
              </div>
            ) : (
              <div className="container">
                <ShopInfo shops={shopsData} update={data.update} />
              </div>
            )
          )
        )}
      </div>
    </>
  );
};

export default App;
