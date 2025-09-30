# using-stream-play

File.stream()을 이용해 chunk 단위로 SourceBuffer에 append하면서 버퍼를 관리하는 스트리밍 예제입니다.

## 기능

- QuotaExceededError 발생 시 300ms 대기 후 재시도하는 로직이 포함되어 있습니다.
- 버퍼가 일정량(예: 60초)을 초과하면 앞부분을 remove 하도록 되어 있습니다.

## 주의사항

- using-stream-play 샘플은 QuotaExceededError(버퍼가 가득 찬 경우)를 감지하고 300ms 대기 후 재시도하는 로직을 포함합니다. 무한 재시도를 방지하기 위한 제한을 추가하거나 상황별 정책을 조정하세요.