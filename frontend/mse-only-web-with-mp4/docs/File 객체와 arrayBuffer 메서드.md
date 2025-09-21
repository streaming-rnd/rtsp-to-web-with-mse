# File 객체와 `arrayBuffer()` 메서드

## 1. `file.arrayBuffer()` 개념

* `File` 객체는 [Blob](https://developer.mozilla.org/docs/Web/API/Blob)을 상속받는다.
* 따라서 `arrayBuffer()` 메서드를 사용할 수 있으며, 이는 **Promise를 반환**한다.
* 이 메서드는 파일 전체 내용을 한 번에 **ArrayBuffer** 형태로 읽어온다.

```javascript
const input = document.querySelector("#fileInput");
input.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const buffer = await file.arrayBuffer();
  console.log(buffer.byteLength); // 파일 크기와 동일
});
```

## 2. 전체 읽기 vs 스트리밍

* `file.arrayBuffer()`는 **파일 전체를 메모리에 로드**한다. 즉, 스트리밍 방식이 아니다.
* 대용량 파일을 처리할 경우 메모리 사용량이 커질 수 있다.

## 3. 스트림 형태 접근

* 스트리밍 처리가 필요하다면 `file.stream()`을 사용해야 한다.
* `file.stream()`은 **ReadableStream**을 반환하며, 청크 단위로 데이터를 읽을 수 있다.

```javascript
const input = document.querySelector("#fileInput");
input.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = file.stream().getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    console.log("청크 크기:", value.length);
  }
});
```

## 4. 요약

* `file.arrayBuffer()` → 파일 전체를 메모리에 로드 (작은/중간 크기 파일에 적합)
* `file.stream()` → 스트리밍 방식으로 청크 단위 접근 가능 (대용량 파일에 적합)

✅ 따라서 파일 크기와 목적에 따라 `arrayBuffer()` 또는 `stream()`을 선택해야 한다.
