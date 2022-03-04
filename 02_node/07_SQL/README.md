데이터를 변수에 저장하면, 서비스가 종료될 때 모든 정보가 사라짐
- 데이터 베이스를 통해 정보를 저장하자!
# 데이터 베이스란?
관련성을 가지며 중복이 없는 데이터들의 집합
- 이런 데이터를 관리하는 것을 DBMS라고 부름

서버에 데이터베이스를 올리면 여러 사람이 동시에 사용하는 것이 가능함
- 각각 읽거나, 쓰거나, 수정 등의 권한을 줄 수 있음
# 오라클 클라우드를 사용한 클라우드 컴퓨터 준비
로컬 컴퓨터를 사용하면 이후 서비스가 어려워 짐
## oracle cloud free tier
[무료 클라우드 컴퓨팅 서버](https://www.oracle.com/kr/cloud/free/)
오라클은 비교적 늦게 클라우드 서비스를 실시하여 평생 무료로 사용할 수 있는 VM를 2대 지원한다!
## 컴퓨터 발급 받는 법
[다음 사이트 참고](https://technfin.tistory.com/entry/오라클-클라우드-인스턴스-생성-서버-만들기)
위에서는 key를 만들어서 붙이지만, 생성을 맡길 수도 있음
## remote - ssh 사용
위 플러그인을 설치하여 편하게 ssh에 연결하자!
- ssh opc@[IP 주소]로 입력하여 기본틀을 만들고 추가로 key를 연결해 주어야함
- 키의 권한자를 400으로 변경해주어야 함
# Postgresql 설치
위 과정을 통해 컴퓨터가 준비되었다면 Postgresql를 설치하자!
- https://haydenjames.io/fix-error-failed-to-download-metadata-for-repo-appstream-centos-8/
- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-centos-8

# 외부 접근 뚫기
꼭 계정에 로그인을 한 상태로 사용해야함
- https://hgko1207.github.io/2020/09/11/postgresql-2/

컴퓨터의 방화벽을 확인하자
- https://technfin.tistory.com/entry/%EC%98%A4%EB%9D%BC%ED%81%B4-%EB%A6%AC%EB%88%85%EC%8A%A4-8-PostgreSQL-13-%EC%99%B8%EB%B6%80-%EC%A0%91%EC%86%8D%ED%95%98%EA%B8%B0

계정에 비밀번호를 설정하자!
- https://brunch.co.kr/@hjinu/3

# 시퀄라이즈 사용하기
디비를 쉽게 관리할 수 있도록 ORM(Object-relational Mapping)을 지원해줌
```javascript
sequelize.sync({force: false})// db 테이블 재생성 유무
  .then(() => {
    console.log('DB Connection');
  })
  .catch((err) => {
    console.error(err);
  })
```
config를 알맞게 변경시켜줘야 함!

