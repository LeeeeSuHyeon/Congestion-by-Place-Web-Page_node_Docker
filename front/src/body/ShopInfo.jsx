import React from 'react';

// 가게 정보를 표시하는 컴포넌트
const ShopInfo = ({ shop, update }) => {

   // 혼잡도에 따라 원의 색상을 결정하는 함수
  const getCircleColor = (ratio) => {
    if (ratio < 0.4) {
      return 'circle-green';
    } else if (ratio >= 0.4 && ratio < 0.7) {
      return 'circle-yellow';
    } else if (ratio >= 0.7 && ratio < 0.99) {
      return 'circle-red';
    } else {
      return 'circle-black';
    }
  };

   // ShopInfo 컴포넌트 렌더링
  return (
    <div>
       {/* 가게 대표 이미지 */}
      <img src={shop.image} alt = "가게 대표 이미지" style={{ width: '450px', height: '450px', marginBottom: '20px' }} />
      <div style={{ marginBottom: '100px' }}>
         {/* 영업 중인 경우의 표시 */}
        {shop.is_open ? (
          <table className="table table-bordered" style={{ width: '450px' }}>
            <tbody>
                {/* 가게 이름 표시 */}
                <tr>
                    <td className="text-center" style={{ width: '100px' }}>가게 이름</td>
                    <td className="text-center">{shop.name}</td>
                </tr>
                {/* 가게 위치 표시 */}
                <tr>
                    <td className="text-center">위치</td>
                    <td className="text-center">{shop.location}</td>
                </tr>
                {/* 가게 카테고리 표시 */}
                <tr>
                    <td className="text-center">카테고리</td>
                    <td className="text-center">{shop.category}</td>
                </tr>
                {/* 가게 현재인원 및 총 인원 표시 */}
                <tr>
                    <td className="text-center">현재 인원</td>
                    <td className="text-center">{shop.user} / {shop.total_user}</td>
                </tr>
                {/* 가게 혼잡도 표시 (색깔 별 원형으로 혼잡도 시각화) */}
                <tr>
                    <td className="text-center">혼잡도</td>
                    <td className="text-center">
                        <div className={`${getCircleColor(shop.user / shop.total_user)}`}></div>
                    </td>
                </tr>
                {/* 가게 영업 시간 표시 */}
                <tr>
                    <td className="text-center">영업 시간</td>
                    <td className="text-center">{shop.start_time} ~ {shop.end_time}</td>
                </tr>
                {/* 가게 영업 중인지 표시 */}
                <tr>
                    <td className="text-center">영업 중</td>
                    <td className="text-center" style={{ fontWeight: 'bold' }}> {shop.is_open === 1 ? "영업 중" : "영업 종료"}</td>
                </tr>
                {/* 가게 상세주소 표시 */}
                <tr>
                    <td className="text-center">상세 주소</td>
                    <td className="text-center">{shop.address}</td>
                </tr>
            </tbody>
          </table>
        ) : (
          <table className="table table-bordered" style={{ width: '450px', backgroundColor: 'gray' }}>
            {/* 비영업 시의 표시 - 배경색을 gray로 표시 */}
            <tbody>
              <tr>
                <td className="text-center" style={{ width: '100px', backgroundColor: 'gray' }}>가게 이름</td>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>{shop.name}</td>
              </tr>
              <tr>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>위치</td>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>{shop.location}</td>
              </tr>
              <tr>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>카테고리</td>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>{shop.category}</td>
              </tr>
              <tr>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>현재 인원</td>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>{shop.user} / {shop.total_user}</td>
              </tr>
              <tr>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>혼잡도</td>
                <td style={{ backgroundColor: 'gray' }}>
                  <div className={getCircleColor(shop.user / shop.total_user)} style={{ margin: '0 auto !important' }}></div>
                </td>
              </tr>
              <tr>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>영업 시간</td>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>{shop.start_time} ~ {shop.end_time}</td>
              </tr>
              <tr>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>영업 중</td>
                <td className="text-center" style={{ fontWeight: 'bold', backgroundColor: 'gray' }}> {shop.is_open === 1 ? "영업 중" : "영업 종료"}</td>
              </tr>
              <tr>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>상세 주소</td>
                <td className="text-center" style={{ backgroundColor: 'gray' }}>{shop.address}</td>
              </tr>
            </tbody>
            
          </table>
        )}
          {/* update 값에 따른 수정 및 삭제 버튼 출력 결정 */}
        {update === 'YES' && (
          <div>
            <a href={`/shop/update/${shop.shop_id}`}><button>수정</button></a>
            <a href={`/shop/delete/${shop.shop_id}`} onClick={() => { if (window.confirm('정말로 삭제하겠습니까?') === false) { return false; } }}><button>삭제</button></a>
          </div>
        )}
      </div>
    </div>
  );
};

// ShopList 컴포넌트
const ShopList = ({ shops, update }) => {

   // 가게 목록 배열
  const shopsArray = shops || [];
  
  // 가게 목록이 존재하면 실행
  if (shopsArray.length > 0) {
    // 각 ShopInfo를 2개씩 묶어서 2열로 출력
    const shopsInRows = [];
    for (let i = 0; i < shopsArray.length; i += 2) {
      const shop1 = shopsArray[i];
      const shop2 = i + 1 < shopsArray.length ? shopsArray[i + 1] : null;

      // 2개의 가게 정보를 한 행으로 출력
      shopsInRows.push(
        <div className="row" key={i}>
          <div className="col">
            {shop1 && <ShopInfo shop={shop1} update={update} />}
          </div>
          <div className="col">
            {shop2 && <ShopInfo shop={shop2} update={update} />}
          </div>
        </div>
      );
    }
    // 2열로 출력된 가게 정보들을 포함하는 컨테이너 출력
    return <div className="container">{shopsInRows}</div>;
  }
  // 가게가 없는 경우 메시지 출력
  else {
      return (
      <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
          존재하는 가게가 없습니다.
      </div>
      );
  }
};

export default ShopList;
