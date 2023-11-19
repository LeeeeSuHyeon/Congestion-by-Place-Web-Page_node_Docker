import React,{useState, useEffect} from 'react';
import CustomerMenu from './menu/CustomerMenu';
import MemberMenu from './menu/MemberMenu';
import ShopInfo from './body/ShopInfo';
import './App.css';

const App = () => {

  const [loginInfo, setLoginInfo] = useState(false);
  const [data, setData] = useState([]);
  const [shopsData, setShopsData] = useState(null); // 새로운 state 변수 추가
  

  // 서버로부터 로그인 정보를 가져오는 비동기 함수
  const fetchLoginInfo = async () => {
    try {
      const response = await fetch('http://192.168.64.8:7080/'); // 서버에서 로그인 정보를 얻는 엔드포인트 경로에 맞게 수정
      const data = await response.json();
      console.log(data);
      setData(data);
      setLoginInfo(data.menu === 'menuForMember.ejs');
      setShopsData(data.shops); // 받아온 가게 데이터를 state에 저장
    } catch (error) {
      console.error('Error fetching login info:', error);
    }
  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번 호출
    fetchLoginInfo();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때만 호출

  return (
    <>
      <div style={{ paddingTop: '90px' }}>
        {loginInfo ? <MemberMenu /> : <CustomerMenu /> }
        <div className="container">
          <ShopInfo shops={shopsData} update = {data.update} />
        </div>
      </div>
    </>
  );
}

export default App;
