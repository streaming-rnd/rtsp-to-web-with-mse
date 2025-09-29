# MP4 Service

MP4 Service는 RTSP 스트리밍을 웹 기반으로 변환하는 프로젝트의 일부로, MP4 파일이 Fast Start 포맷인지 확인하고 웹 스트리밍에 적합한 파일을 제공하는 NestJS 기반 백엔드 서비스입니다.

Fast Start 포맷은 MP4 파일에서 moov 박스가 파일의 앞부분에 위치하여, 스트리밍 시작 전에 메타데이터를 로드할 수 있도록 하는 포맷입니다. 이 서비스는 MP4 파일의 포맷을 검증하여 스트리밍 호환성을 보장합니다.

## 기능

- MP4 파일의 Fast Start 포맷 검증
- Fast Start 포맷의 MP4 파일 제공
- RESTful API를 통한 파일 액세스

## API 문서

### GET /mp4/:filename

지정된 파일명의 MP4 파일을 제공합니다. 파일이 Fast Start 포맷이 아닌 경우 400 Bad Request 에러를 반환합니다.

**파라미터:**
- `filename` (string): MP4 파일의 이름 (확장자 포함)

**응답:**
- 성공: MP4 파일 바이너리 데이터
- 실패:
  - 400 Bad Request: 파일이 Fast Start 포맷이 아님
  - 404 Not Found: 파일을 찾을 수 없음

**예시:**
```
GET /mp4/sample.mp4
```

## 설치 및 실행

### 사전 요구사항

- Node.js (버전 16 이상)
- npm

### 설치

```bash
npm install
```

### 실행

```bash
# 개발 모드
npm run start:dev

# 프로덕션 모드
npm run start:prod
```

서버는 기본적으로 `http://localhost:3000`에서 실행됩니다. 환경 변수 `PORT`로 포트를 변경할 수 있습니다.

### 빌드

```bash
npm run build
```

## 테스트

```bash
# 유닛 테스트
npm run test

# E2E 테스트
npm run test:e2e

# 테스트 커버리지
npm run test:cov
```

## 파일 구조

MP4 파일들은 `assets/mp4s/` 디렉토리에 저장되어 있어야 합니다. 서비스는 이 디렉토리에서 파일을 검색합니다.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
