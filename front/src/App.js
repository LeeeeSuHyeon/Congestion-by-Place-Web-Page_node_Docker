import React,{useState, useEffect} from 'react';
import CustomerMenu from './menu/CustomerMenu';
import MemberMenu from './menu/MemberMenu';
import ShopInfo from './body/ShopInfo';
import Login from './body/Login'
import Register from './body/Register';

import './App.css';

const url = 'http://192.168.64.8:7080'
const currentPath = window.location.pathname;

const App = () => {

  const [loginInfo, setLoginInfo] = useState(false);
  const [data, setData] = useState([]);
  const [shopsData, setShopsData] = useState(null); // 새로운 state 변수 추가
  

  // 서버로부터 홈 정보를 가져오는 비동기 함수
  const fetchLoginInfo = async () => {
    try {  
      const response = await fetch(url + '/'); // 서버에서 로그인 정보를 얻는 엔드포인트 경로에 맞게 수정
      const data = await response.json();
      console.log(data);
      setData(data);
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

  const fetchLoginProcess = async () => {
    try {
      const response = await fetch(url + '/auth/login_process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setData(data);
        setLoginInfo(data.menu === 'menuForMember');
        // 여기서 리다이렉트를 직접 수행하지 않도록 수정
      } else {
        // 오류 응답 처리
        console.error('Error fetching login process:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error fetching login process:', error);
    }
  };


  const fetchCutomerViewData = async (vu, id) => {
    try {
        const response = await fetch(url + `/shop/customerView/${vu}/${id}`);
        if (response.ok) {
            const data = await response.json();
            setData(data);
            setShopsData(data.shops); // 받아온 가게 데이터를 state에 저장
            // 받아온 데이터 처리
            console.log(data);
        } else {
            console.error('Error fetching data:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
  
  
  useEffect(() => {
    console.log('ㅎㅇ')
    const fetchData = async () => {

      if (currentPath === '/') {
        await fetchLoginInfo();
      } else if (currentPath === '/auth/login') {
        await fetchLogin();
      } else if (currentPath === '/auth/login_process') {
        await fetchLoginProcess();
      } else if (currentPath === '/shop/customerView/location/1'){
        await fetchCutomerViewData('location', 1)
      } else if (currentPath === '/shop/customerView/location/2'){
        await fetchCutomerViewData('location', 2)
      } else if (currentPath === '/shop/customerView/location/3'){
        await fetchCutomerViewData('location', 3)
      } else if (currentPath === '/shop/customerView/category/1'){
        await fetchCutomerViewData('category', 1)
      } else if (currentPath === '/shop/customerView/category/2'){
        await fetchCutomerViewData('category', 2)
      } else if (currentPath === '/shop/customerView/category/3'){
        await fetchCutomerViewData('category', 3)
      } 
      
    };
  
    fetchData();
  }, []);
  
  return (
    <>
      <div style={{ paddingTop: '90px' }}>
        {loginInfo ? <MemberMenu name={data.name} licence = {data.licence}/> : <CustomerMenu /> }

        {currentPath === '/' ? 
        (
          <div className="container">
            <ShopInfo shops={shopsData} update = {data.update} />
          </div>
        )
        : currentPath === '/auth/login' ?
        (
          <div className="container">
            <Login />
          </div>
        ) 
        :currentPath === '/auth/register' ?
        (
          <div className="container">
            <Register />
          </div>
        )
        :
        (
          <div className="container">
            <ShopInfo shops={shopsData} update = {data.update} />
          </div>
        )
      }
        
      </div>
    </>
  );
}

export default App;
