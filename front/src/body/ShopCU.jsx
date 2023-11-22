import React, { useState } from 'react';

const ShopForm = ({ shop }) => {
  // 파일명 상태 관리
  const [fileName, setFileName] = useState('');

   // 파일명 표시 함수
  const displayFileName = () => {
    const fileInput = document.getElementById('file');
    setFileName(fileInput.value);
  };

   // 가게 등록/수정 양식 렌더링
  return (
    <div className="container">
      {/* 상위 컴포넌트에서 props로 전달해준 shop의 유무에 따라 create/update 구분  */}
      <h2>{shop !== null ? '가게 수정' : '가게 등록'}</h2>
      {/* 가게 등록/수정 양식 */}
      <form action={shop !== null ? '/shop/update_process' : '/shop/create_process'} method="post" encType="multipart/form-data">
        {/* update시에는 hidden으로 shop_id 값을 서버로 보내줘야 됨 */}
        {shop !== null && <input type="hidden" name="shop_id" value={shop.shop_id} />}
        {/* 위치 선택 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="location_id">
            위치
          </label>
          <select name="location" id="location_id" defaultValue={shop?.location}>
            <option value="교내">교내</option>
            <option value="태평동">태평동</option>
            <option value="복정동">복정동</option>
          </select>
        </div>
        {/* 카테고리 선택 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="category_id">
            카테고리
          </label>
          <select name="category" id="category_id" defaultValue={shop?.category}>
            <option value="음식점">음식점</option>
            <option value="카페">카페</option>
            <option value="헬스장">헬스장</option>
          </select>
        </div>
         {/* 가게 이름 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            가게 이름
          </label>
          <input className="form-control" type="text" name="name" style={{ width: '300px' }} value={shop?.name || ''} />
        </div>
        {/* 총 인원 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            총 인원
          </label>
          <input className="form-control" type="text" name="total_user" style={{ width: '300px' }} value={shop?.total_user || ''} />
        </div>
         {/* 현재 인원 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            현재 인원
          </label>
          <input className="form-control" type="text" name="user" style={{ width: '300px' }} value={shop?.user || ''} />
        </div>
        {/* 영업 시작 시간 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            영업 시작 시간
          </label>
          <input className="form-control" type="text" name="start_time" style={{ width: '300px' }} value={shop?.start_time || ''} />
        </div>
        {/* 영업 종료 시간 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            영업 종료 시간
          </label>
          <input className="form-control" type="text" name="end_time" style={{ width: '300px' }} value={shop?.end_time || ''} />
        </div>
        {/* 현재 영업 여부 체크박스 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            현재 영업 여부
          </label>
          <input className="form-check-input" type="checkbox" name="is_open" defaultChecked={shop?.is_open} />
        </div>
        {/* 가게 주소 입력 필드 */}
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            가게 주소
          </label>
          <input className="form-control" type="text" name="address" style={{ width: '300px' }} value={shop?.address || ''} />
        </div>
        {/* 가게 사업자 ID(hidden) - 매장을 등록한 유저의 아이디를 같이 전달(외래키로 사용하기 때문)*/}
        <input type="hidden" name="businessperson_loginid" value={shop?.businessperson_loginid || ''} />
        {/* 대표 사진 업로드 필드 */}
        <div className="mb-3">
          <input
            className="upload-name"
            value={fileName}
            name="image"
            placeholder="대표 사진"
          />
          <input type="file" id="file" name="uploadFile" onChange={displayFileName} />
        </div>
         {/* 입력 버튼 */}
        <button className="btn btn-outline-primary btn-sm" type="submit">
          입력
        </button>
      </form>
    </div>
  );
};

export default ShopForm;
