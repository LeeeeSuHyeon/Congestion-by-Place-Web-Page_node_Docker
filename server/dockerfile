# Node.js 이미지를 기반으로 사용
FROM node:14

# 앱 디렉토리 생성
# 컨테이너 내에서 애플리케이션을 실행할 디렉토리를 /usr/src/app로 설정
# 이 디렉토리가 애플리케이션의 작업 디렉토리가 됨 
WORKDIR /usr/src/app

# 앱 의존성 설치 (package.json 및 package-lock.json 복사)
COPY package*.json ./

# EJS 라이브러리 설치 및 추가적인 모듈 설치
RUN npm install ejs express express-session mysql body-parser

# 앱 실행
# 컨테이너가 시작될 때 실행될 명령어를 정의
CMD ["node"]