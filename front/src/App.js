import React,{useState, useEffect} from 'react';
import CustomerMenu from './menu/CustomerMenu';
import MemberMenu from './menu/MemberMenu';
import ShopInfo from './body/ShopInfo';
import Login from './body/Login'
import Register from './body/\bRegister';

import './App.css';

const url = 'http://192.168.64.8:7080'
const currentPath = window.location.pathname;

const App = () => {

  const [loginInfo, setLoginInfo] = useState(false);
  const [data, setData] = useState([]);
  const [shopsData, setShopsData] = useState(null); // 새로운 state 변수 추가
  const [name, setName] = useState('');
  const [licence, setLicence] = useState('');
  

  // 서버로부터 홈 정보를 가져오는 비동기 함수
  const fetchLoginInfo = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if(urlParams.has('menu')){
        const data = {
          menu: urlParams.get('menu'),
          shops: urlParams.get('shops'),
          body : urlParams.get('body'),
          name : urlParams.get('name'),
          licence : urlParams.get('licence'),
          update : urlParams.get('update'),
        }

        console.log(data.shops)
        setData(data.shops);
        setLoginInfo(data.menu === 'menuForMember');
        setShopsData(data.shops);
        setName(data.name)
        setLicence(data.licence)
      }
      else{
        const response = await fetch(url + '/'); // 서버에서 로그인 정보를 얻는 엔드포인트 경로에 맞게 수정
        const data = await response.json();
        console.log(data);
        setData(data);
        setLoginInfo(data.menu === 'menuForMember');
        setShopsData(data.shops); // 받아온 가게 데이터를 state에 저장
      }

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

  

  useEffect(() => {

    if(currentPath === '/'){
      // 컴포넌트가 마운트될 때 한 번 호출
      fetchLoginInfo();
    }
    else if(currentPath === '/auth/login'){
      fetchLogin();
    }
    
    
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 호출

  return (
    <>
      <div style={{ paddingTop: '90px' }}>
        {loginInfo ? <MemberMenu name={name} licence = {licence}/> : <CustomerMenu /> }

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
        :
        (
          <div className="container">
            <Register />
          </div>
        )
      }
        
      </div>
    </>
  );
}

export default App;
