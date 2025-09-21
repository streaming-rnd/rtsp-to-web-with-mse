# HTML `<input type="file">` 개념 및 사용법 정리

## 1. 개념

* `<input type="file">`은 사용자가 **로컬 컴퓨터에서 파일을 선택**할 수 있도록 하는 HTML 폼 요소이다.
* 선택한 파일은 브라우저에서 서버로 전송할 수 있으며, 일반적으로 **파일 업로드** 기능을 구현할 때 사용된다.
* 기본적으로 파일 선택 창(파일 탐색기)이 열리며, 사용자가 파일을 지정하면 해당 파일의 메타정보(파일명, MIME 타입 등)가 `<input>` 요소에 저장된다.

## 2. 기본 사용법

```html
<form action="/upload" method="post" enctype="multipart/form-data">
  <label for="fileInput">파일 업로드:</label>
  <input type="file" id="fileInput" name="myFile">
  <button type="submit">업로드</button>
</form>
```

* `enctype="multipart/form-data"`: 파일 업로드 시 반드시 설정해야 하는 속성.
* `name`: 서버에서 해당 파일을 식별할 수 있도록 하는 필드 이름.

## 3. 주요 속성

### 3.1 `multiple`

* 여러 개의 파일을 동시에 선택할 수 있도록 허용.

```html
<input type="file" name="photos" multiple>
```

### 3.2 `accept`

* 선택 가능한 파일의 **MIME 타입**이나 확장자를 제한.

```html
<input type="file" accept="image/*"> <!-- 모든 이미지 파일 -->
<input type="file" accept=".pdf,.docx"> <!-- 특정 확장자 -->
<input type="file" accept="audio/*"> <!-- 오디오 파일 -->
```

### 3.3 `required`

* 파일 선택을 필수로 지정.

```html
<input type="file" name="resume" required>
```

## 4. 자바스크립트 활용

파일 입력 값은 보안상의 이유로 브라우저에서 **수정 불가**하지만, 자바스크립트로 파일 선택 후 정보를 확인할 수 있다.

```html
<input type="file" id="fileInput" multiple>
<script>
  document.getElementById("fileInput").addEventListener("change", (event) => {
    const files = event.target.files;
    for (let file of files) {
      console.log(`파일명: ${file.name}, 크기: ${file.size} bytes, 타입: ${file.type}`);
    }
  });
</script>
```

## 5. 보안 고려 사항

* 브라우저는 보안상의 이유로 **파일 경로 전체**를 서버로 보내지 않고, **파일 이름만** 제공한다.
* 사용자가 직접 선택하지 않은 파일을 스크립트로 강제로 업로드할 수 없다.
* 대용량 파일 업로드 시 서버에서 업로드 크기 제한, 보안 검사(예: 악성코드 검사)를 반드시 수행해야 한다.

## 6. 활용 사례

* 프로필 이미지 업로드
* 문서 제출 (PDF, DOCX)
* 오디오/비디오 파일 업로드
* 여러 장의 사진 업로드

---

✅ 요약: `<input type="file">`은 HTML에서 파일 업로드 기능을 제공하는 핵심 요소이다. `multiple`, `accept`, `required` 속성을 활용하면 사용성을 높일 수 있고, 자바스크립트를 이용해 선택한 파일 정보를 다룰 수 있다. 서버에서는 반드시 파일 검증과 보안 처리를 해야 한다.
