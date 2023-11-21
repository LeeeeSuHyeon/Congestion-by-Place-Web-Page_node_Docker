import React, { useState } from 'react';

const ShopForm = ({ shop }) => {
  const [fileName, setFileName] = useState('');

  const displayFileName = () => {
    const fileInput = document.getElementById('file');
    setFileName(fileInput.value);
  };

  return (
    <div className="container">
      <h2>{shop !== null ? '가게 수정' : '가게 등록'}</h2>
      <form action={shop !== null ? '/shop/update_process' : '/shop/create_process'} method="post" encType="multipart/form-data">
        {shop !== null && <input type="hidden" name="shop_id" value={shop.shop_id} />}
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
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            가게 이름
          </label>
          <input className="form-control" type="text" name="name" style={{ width: '300px' }} value={shop?.name || ''} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            총 인원
          </label>
          <input className="form-control" type="text" name="total_user" style={{ width: '300px' }} value={shop?.total_user || ''} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            현재 인원
          </label>
          <input className="form-control" type="text" name="user" style={{ width: '300px' }} value={shop?.user || ''} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            영업 시작 시간
          </label>
          <input className="form-control" type="text" name="start_time" style={{ width: '300px' }} value={shop?.start_time || ''} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            영업 종료 시간
          </label>
          <input className="form-control" type="text" name="end_time" style={{ width: '300px' }} value={shop?.end_time || ''} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            현재 영업 여부
          </label>
          <input className="form-check-input" type="checkbox" name="is_open" defaultChecked={shop?.is_open} />
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="id">
            가게 주소
          </label>
          <input className="form-control" type="text" name="address" style={{ width: '300px' }} value={shop?.address || ''} />
        </div>
        <input type="hidden" name="businessperson_loginid" value={shop?.businessperson_loginid || ''} />
        <div className="mb-3">
          <input
            className="upload-name"
            value={fileName}
            name="image"
            placeholder="대표 사진"
          />
          <input type="file" id="file" name="uploadFile" onChange={displayFileName} />
        </div>
        <button className="btn btn-outline-primary btn-sm" type="submit">
          입력
        </button>
      </form>
    </div>
  );
};

export default ShopForm;
