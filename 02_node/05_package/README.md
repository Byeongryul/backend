# npm 알아보기
- 다양한 패키지가 정리 되어 있음
- yarn이라는 대체재도 존재
# package.json 으로 패키지 관리
노드 프로젝트에서는 package.json이 필수임
- npm init 최초 설치
- npm run test
***
패키지에 모듈 설치
- npm i express
***
express는 다양한 모듈을 사용하고 있기에 당연히 다른 모듈도 가져오게 되어있음
- 그렇기에 package 를 통해 사용하는 모듈을 명시할 필요가 있음
- npm i 깃주소 를 통해 설치가 가능함
# package 버전 이해
1.0.7
1. 하위호환 안됨
2. 하위호환 됨
3. 간단한 버그 패치
- 버전을 나타낼 때
- ^ 하위호환이 되는 범위까지 설치
- @lastest 안전화된 마지막 버전
- @next 안전화 되지 않은 마지막 버전
- rc 출시 직전의 버전
# 기타 npm 명령어
업데이트
- npm update
- npm uninstall
- npm search 검색
- npm info  정보
- npm adduser 로그인
# npm 배포
이건 넘김