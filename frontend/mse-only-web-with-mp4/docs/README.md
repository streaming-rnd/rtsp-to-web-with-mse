# mse-only-web-with-mp4

MSE(Media Source Extensions)를 사용해 (가능하면) MP4를 append 후 재생 시도합니다. MSE 미지원 또는 실패 시 URL.createObjectURL로 폴백합니다.

## 기능

- MSE를 활용한 MP4 스트리밍 재생.
- MSE가 지원되지 않거나 실패할 경우, Blob URL을 통해 일반 재생으로 폴백.

## 주의사항

- MSE는 fragmented MP4(fMP4)를 더 잘 지원합니다. 일반(non-fragmented) MP4의 경우 MSE로 append해도 재생이 안 될 수 있으므로 폴백 로직(URL.createObjectURL)이 필요합니다.
- 브라우저 호환성: 대부분의 데스크톱 크롬/엣지/파이어폭스는 MSE를 지원하지만 iOS Safari는 제한적일 수 있습니다.