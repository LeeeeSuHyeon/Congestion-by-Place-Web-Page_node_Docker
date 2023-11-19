import React from 'react';

// 가게 정보를 표시하는 컴포넌트
const ShopInfo = ({ shop, update }) => {
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

  return (
    <div>
      <img src={shop.image} alt = "가게 대표 이미지" style={{ width: '450px', height: '450px', marginBottom: '20px' }} />
      <div style={{ marginBottom: '100px' }}>
        {shop.is_open ? (
          <table className="table table-bordered" style={{ width: '450px' }}>
            <tbody>
                <tr>
                    <td className="text-center" style={{ width: '100px' }}>가게 이름</td>
                    <td className="text-center">{shop.name}</td>
                </tr>
                <tr>
                    <td className="text-center">위치</td>
                    <td className="text-center">{shop.location}</td>
                </tr>
                <tr>
                    <td className="text-center">카테고리</td>
                    <td className="text-center">{shop.category}</td>
                </tr>
                <tr>
                    <td className="text-center">현재 인원</td>
                    <td className="text-center">{shop.user} / {shop.total_user}</td>
                </tr>
                <tr>
                    <td className="text-center">혼잡도</td>
                    <td className="text-center">
                        <div className={`${getCircleColor(shop.user / shop.total_user)}`}></div>
                    </td>
                </tr>
                <tr>
                    <td className="text-center">영업 시간</td>
                    <td className="text-center">{shop.start_time} ~ {shop.end_time}</td>
                </tr>
                <tr>
                    <td className="text-center">영업 중</td>
                    <td className="text-center" style={{ fontWeight: 'bold' }}> {shop.is_open === 1 ? "영업 중" : "영업 종료"}</td>
                </tr>
                <tr>
                    <td className="text-center">상세 주소</td>
                    <td className="text-center">{shop.address}</td>
                </tr>
            </tbody>
          </table>
        ) : (
          <table className="table table-bordered" style={{ width: '450px', backgroundColor: 'gray' }}>
            {/* 비영업 시의 표시 */}
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
  const shopsArray = shops || [];
  
  if (shopsArray.length > 0) {
    // 각 ShopInfo를 2개씩 묶어서 2열로 출력
    const shopsInRows = [];
    for (let i = 0; i < shopsArray.length; i += 2) {
      const shop1 = shopsArray[i];
      const shop2 = i + 1 < shopsArray.length ? shopsArray[i + 1] : null;

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

    return <div className="container">{shopsInRows}</div>;
    } else {
        return (
        <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
            존재하는 가게가 없습니다.
        </div>
        );
    }
};

export default ShopList;
