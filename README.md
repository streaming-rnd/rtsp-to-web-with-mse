# rtsp-to-web-with-mse (간단 설명)

이 저장소는 브라우저만으로 로컬 MP4 재생 및 스트리밍 시나리오를 실험하기 위한 샘플들로 구성되어 있습니다.
주요 목적은 Media Source Extensions(MSE)를 이용한 스트리밍/버퍼 관리와, MP4 파일이 "fast start" (moov가 mdat보다 앞에 위치)인지 검사하는 도구를 제공하는 것입니다.

디렉터리 구성(주요 항목)
- [MP4 파일의 Fast Start 포맷 검증 및 웹 스트리밍에 적합한 파일 제공 기능](backend/mp4-service/README.md)
- [로컬 MP4 파일의 fast-start 여부 검사 도구](frontend/detect-mp4-fast-start/docs/README.md) 
- [MSE를 활용한 MP4 스트리밍 재생 예제](frontend/mse-only-web-with-mp4/docs/README.md) 
- [File.stream()을 이용한 chunk 단위 스트리밍 및 버퍼 관리 예제](frontend/using-stream-play/docs/README.md)

사용 방법 (권장: 로컬 서버에서 실행)
브라우저의 보안 제한 때문에 간단히 파일을 열어도 동작하나, 로컬 서버에서 열면 더 일관된 동작을 확인할 수 있습니다.

PowerShell:
- 저장소 루트(c:\Users\moony\my-second-work\rtsp-to-web-with-mse)에서:
  - python 설치 시: python -m http.server 8000
  - 또는: py -3 -m http.server 8000

명령 프롬프트(cmd):
- python -m http.server 8000

그런 다음 브라우저에서 다음 URL로 접속:
- http://localhost:8000/frontend/detect-mp4-fast-start/index.html
- http://localhost:8000/frontend/mse-only-web-with-mp4/index.html
- http://localhost:8000/frontend/using-stream-play/index.html

주의사항 및 한계
- MSE는 fragmented MP4(fMP4)를 더 잘 지원합니다. 일반(non-fragmented) MP4의 경우 MSE로 append해도 재생이 안 될 수 있으므로 폴백 로직(URL.createObjectURL)이 필요합니다.
- fast-start 판별은 파일의 앞부분만 스캔하므로(기본 1MB), moov가 파일 중간에 있거나 확장된 박스 구조인 경우 'unknown'이 반환될 수 있습니다. 검사 바이트 한도를 늘리면 더 정확하지만 읽는 바이트가 증가합니다.
- using-stream-play 샘플은 QuotaExceededError(버퍼가 가득 찬 경우)를 감지하고 300ms 대기 후 재시도하는 로직을 포함합니다. 무한 재시도를 방지하기 위한 제한을 추가하거나 상황별 정책을 조정하세요.
- 브라우저 호환성: 대부분의 데스크톱 크롬/엣지/파이어폭스는 MSE를 지원하지만 iOS Safari는 제한적일 수 있습니다.

기여 및 확장 아이디어
- fast-start 검사 범위를 설정 옵션으로 추가
- fMP4로 변환 없이 non-fragmented MP4를 분할해서 MSE에 맞게 변환하는 유틸 추가
- 더 견고한 버퍼 관리 정책(동적 버퍼 크기, 재시도 카운트 노출 등)

간단한 테스트 플로우
1. 로컬 서버 실행 (위 명령 사용).  
2. 브라우저에서 detect-mp4-fast-start/index.html 열기 → MP4 선택 → 결과 확인.  
3. mse-only 또는 using-stream-play HTML 파일 열어 실제 재생/스트리밍 동작 확인.
