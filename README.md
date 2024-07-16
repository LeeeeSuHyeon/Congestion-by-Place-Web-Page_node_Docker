도커 컨테이너를 활용한 카테고리 (음식점, 카페, 헬스장) 및 위치 (복정동, 태평동, 가천대학교 교내) 별 매장 인원 혼잡도 확인 웹 페이지
======================================================================================================

## 도커허브 링크 : <https://hub.docker.com/u/leesuhyeon>

  
### Frontend Program: React
* <https://hub.docker.com/r/leesuhyeon/front>

### Backend Program: NodeJS
* <https://hub.docker.com/r/leesuhyeon/server>

<hr>

      
### 문제 현황 
• 교내 식당 방문 시, 손님이 많아 이용하지 못한 경험 많음   
• 헬스장은 시간대에 따라 사용자 수의 차이가 심함   


### 해결방안
• “위치, 장소 별 매장 내 인원 혼잡도 확인 웹 페이지” 개발   
• 웹 페이지에 접속하여 매장에 가지 않고 미리 영업 여부, 혼잡도 등을 확인 가능    

### 기능
• 장소에 직접 가지 않아도 실시간으로 혼잡도 확인 가능    
• 사용자 네비게이션 바를 통해, 자신의 원하는 위치, 카테고리 별로 매장 확인 가능    
• 매장 이름, 위치, 카테고리, 현재인원 및 최대 수용인원, 혼잡도(시각화), 영업 시간, 현재 영업 여부, 상세 주소 확인 가능    
• 사업자 번호를 통해 회원가입   
• 데이터 베이스를 연결하여, 로그인 기능 구현    
• 등록한 회원은 자신의 매장을 생성, 수정, 삭제 가능   


### 전체 시스템 구성도
<img width="521" alt="image" src="https://github.com/user-attachments/assets/d2caf6c2-153b-463f-8fd7-0c76caf4fbd5">

1.	Hosts 파일을 변경하여 congestion.com 접속 시 url을 우분투 IP로 변경 후 congestion.com 접속
2.	DNS 서버에서 congestion.com 을 IP 주소 응답
3.	congestion.com 접속 시 Nginx Proxy에서 설정한 192.168.64.8:7070 으로 역방향 프록시 사용 
4.	역방향 프록시가 작동하여, 7070 포트로 재접속
5.	7070포트와 연결된 프론트 컨테이너가 웹페이지로 index.html 파일 반환 
6.	비동기 통신(fetch 사용)을 통해 7080 포트로 데이터 요청
7.	서버 컨테이너는 DB 컨테이너에 데이터 요청 후, 데이터 응답 받음
8.	서버 컨테이너는 웹페이지로 데이터를 json 객체로 변환하여 응답해주고, 이후 데이터를 이용하여 웹페이지 구현



### 구현 페이지
<img width="552" alt="image" src="https://github.com/user-attachments/assets/847994c4-4da2-4240-9ee4-ecdcd5c1ede8">
<hr>
<img width="502" alt="image" src="https://github.com/user-attachments/assets/c2b3b6c0-001a-49b9-bf81-051bbee7689e">
<hr>
<img width="513" alt="image" src="https://github.com/user-attachments/assets/bee67c05-1e2f-4333-9f1d-97e9cd59eab1">
<hr>
<img width="531" alt="image" src="https://github.com/user-attachments/assets/016e42d9-4233-4c97-9e9b-392335250887">
<hr>
<img width="452" alt="image" src="https://github.com/user-attachments/assets/dc978e23-6f12-4509-a7a1-eacfb56a1ac6">
<hr>
<img width="481" alt="image" src="https://github.com/user-attachments/assets/ec231f27-c51a-4df8-be48-f6e96a675b98">
<hr>
<img width="505" alt="image" src="https://github.com/user-attachments/assets/fb06c59b-fd96-47b4-af4c-a42094a940ac">
<hr>
<img width="506" alt="image" src="https://github.com/user-attachments/assets/ff35c58c-ef64-4b59-93eb-7e90c047e851">
<hr>
<img width="452" alt="image" src="https://github.com/user-attachments/assets/aacc1457-f776-46a6-b2b7-d7db3f340a69">
<hr>
<img width="452" alt="image" src="https://github.com/user-attachments/assets/60857fc2-1e96-4cec-98ed-df914fa805c7">
<hr>

### 향후 추가 기능
• 객체 탐지 기능을 추가하여 매장 내 인원 수를 DB에 수정 가능하면, 수동으로 인원을 수정하지 않아도 됨   
• ejs 파일에서 React 프로그램으로 변환 중 (로그인 세션 문제 해결 중)   
