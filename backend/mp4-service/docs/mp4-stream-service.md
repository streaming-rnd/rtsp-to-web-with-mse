# MP4 모듈 설명

## 개요
MP4 모듈은 NestJS 기반의 백엔드 서비스에서 MP4 파일을 서빙하기 위한 모듈입니다. 이 모듈은 MP4 파일이 "Fast Start" 포맷인지 확인한 후에만 파일을 제공하며, 스트리밍에 적합한 최적화된 MP4 파일을 처리합니다.

## 구성 요소
- **Mp4Controller**: HTTP 요청을 처리하는 컨트롤러. `/mp4/:filename` 엔드포인트를 통해 MP4 파일을 서빙합니다.
- **Mp4Service**: 비즈니스 로직을 담당하는 서비스. 파일 경로 생성과 Fast Start 확인 기능을 제공합니다.
- **Mp4Module**: 모듈 설정을 담당하며, 컨트롤러와 서비스를 등록합니다.

## API 엔드포인트
- **GET /mp4/:filename**
  - 설명: 지정된 파일명의 MP4 파일을 반환합니다.
  - 파라미터:
    - `filename`: 서빙할 MP4 파일의 이름 (확장자 포함).
  - 응답:
    - 성공: MP4 파일 데이터 (Fast Start 포맷 확인 후).
    - 오류:
      - 400: MP4 파일이 Fast Start 포맷이 아닙니다.
      - 404: 파일을 찾을 수 없습니다.

## MP4 파일 위치
MP4 서비스를 시작하기 위해 서빙할 MP4 파일은 다음 디렉토리에 위치해야 합니다:
```
backend/mp4-service/assets/mp4s/
```

### 디렉토리 구조 예시
```
backend/mp4-service/
├── assets/
│   └── mp4s/
│       ├── sample1.mp4
│       ├── sample2.mp4
│       └── ...
```

### 파일 요구사항
- MP4 파일은 반드시 "Fast Start" 포맷이어야 합니다. Fast Start 포맷은 파일의 메타데이터(moov 박스)가 파일의 시작 부분에 위치하여 스트리밍이 효율적으로 이루어지도록 합니다.
- 파일명은 엔드포인트 호출 시 파라미터로 사용되므로, 특수문자를 피하고 영문/숫자로 구성하는 것이 좋습니다.

### Fast Start 확인 방법
MP4 파일이 Fast Start 포맷인지 확인하려면, 파일의 첫 번째 박스가 'ftyp'이고, 그 다음 박스가 'moov'인지 확인합니다. 이 모듈의 Mp4Service.isFastStart 메서드가 이를 자동으로 검증합니다.

## 애플리케이션 시작 방법

MP4 서비스를 시작하려면 다음과 같은 단계를 따르세요:

1. 터미널에서 `backend/mp4-service` 디렉토리로 이동합니다.
2. 다음 명령어 중 하나를 실행합니다:
   - 개발 모드 (권장): `npm run start:dev`
   - 일반 모드: `npm run start`
   - 프로덕션 모드: `npm run start:prod`
3. 애플리케이션이 시작되면, 콘솔에 표시된 URL (예: http://localhost:4000)을 확인합니다. 포트는 기본적으로 4000부터 시작하며, 포트가 사용 중이면 자동으로 다음 포트로 증가합니다.

## play-with-mp4.html 사용 방법

MP4 파일을 스트리밍하여 재생하려면 다음과 같이 하세요:

1. 브라우저에서 MP4 서비스의 URL에 `/play-with-mp4/play-with-mp4.html`을 추가하여 접근합니다 (예: http://localhost:4000/play-with-mp4/play-with-mp4.html).
2. 페이지에 표시된 입력 필드에 재생할 MP4 파일의 이름을 입력합니다 (예: sample.mp4).
3. "재생" 버튼을 클릭합니다.
4. 비디오 플레이어가 MSE (Media Source Extensions)를 사용하여 파일을 스트리밍하고 재생합니다. 버퍼링 관리가 자동으로 수행됩니다.

### 주의사항
- 브라우저가 MSE와 지정된 코덱 (avc1.42E01E, mp4a.40.2)을 지원해야 합니다.
- 비디오가 음소거 상태로 시작될 수 있습니다. 사용자 상호작용 후 재생이 가능합니다.