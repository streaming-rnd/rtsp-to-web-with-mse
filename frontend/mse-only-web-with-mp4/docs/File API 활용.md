# File API 활용 예제: `arrayBuffer()` vs `stream()`

## 1. 작은 파일 처리 (arrayBuffer)

작은 이미지 파일이나 텍스트 파일은 전체를 메모리에 올려도 부담이 적기 때문에 `arrayBuffer()`를 사용하는 것이 편리하다.

### 예제: 이미지 파일 미리보기

```html
<input type="file" id="imgInput" accept="image/*">
<img id="preview" width="200">
<script>
  document.getElementById("imgInput").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // 파일 전체를 ArrayBuffer로 읽기
    const buffer = await file.arrayBuffer();
    const blob = new Blob([buffer], { type: file.type });
    document.getElementById("preview").src = URL.createObjectURL(blob);
  });
</script>
```

✅ 장점: 간단하고 빠르며, 소용량 파일 처리에 적합.

---

## 2. 대용량 파일 처리 (stream)

수백 MB\~수 GB에 이르는 파일은 전체를 메모리에 로드하면 브라우저가 멈추거나 메모리 부족 문제가 발생할 수 있다. 이 경우 `stream()`을 사용해 **청크 단위**로 데이터를 읽는다.

### 예제: 대용량 텍스트 파일 분석

```html
<input type="file" id="logInput" accept=".txt">
<script>
  document.getElementById("logInput").addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const decoder = new TextDecoder("utf-8");
    const reader = file.stream().getReader();
    let partialText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // 청크를 텍스트로 변환
      partialText += decoder.decode(value, { stream: true });

      // 줄 단위 분석 예시
      let lines = partialText.split("\n");
      partialText = lines.pop(); // 마지막 줄은 다음 청크에서 이어짐

      for (let line of lines) {
        if (line.includes("ERROR")) {
          console.log("에러 로그 발견:", line);
        }
      }
    }

    if (partialText.length > 0) {
      console.log("마지막 줄:", partialText);
    }
  });
</script>
```

✅ 장점: 메모리 효율적이며, 대용량 파일도 안정적으로 처리 가능.

---

## 3. 비교 정리

| 방식              | 특징             | 적합한 경우              |
| --------------- | -------------- | ------------------- |
| `arrayBuffer()` | 파일 전체를 메모리에 로드 | 작은 이미지, 문서, 빠른 미리보기 |
| `stream()`      | 파일을 청크 단위로 읽음  | 로그 분석, 대용량 데이터 처리   |

---

👉 결론: **소용량 → `arrayBuffer()`**, \*\*대용량 → `stream()`\*\*을 선택하는 것이 최적의 전략이다.
