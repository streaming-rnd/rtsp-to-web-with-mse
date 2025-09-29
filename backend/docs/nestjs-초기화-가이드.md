# NestJS 프로젝트 초기화 가이드

이 문서는 NestJS 프레임워크를 사용하여 새로운 프로젝트를 초기화하는 절차를 단계별로 설명합니다. MP4 서비스 프로젝트를 예제로 사용합니다.

## 사전 요구사항

- Node.js (버전 16 이상 권장)
- npm (Node.js와 함께 설치됨)

## 단계별 절차

### 1. NestJS CLI 설치

NestJS 프로젝트를 생성하기 위해 NestJS CLI를 전역으로 설치합니다.

```bash
npm install -g @nestjs/cli
```

### 2. 프로젝트 디렉토리 생성

프로젝트를 배치할 디렉토리를 생성합니다. 예를 들어, `mp4-service` 디렉토리를 생성합니다.

```bash
mkdir mp4-service
cd mp4-service
```

### 3. NestJS 프로젝트 초기화

NestJS CLI를 사용하여 새 프로젝트를 초기화합니다. 이 단계에서 기본 구조와 파일들이 생성됩니다.

```bash
nest new . --package-manager npm --skip-git --skip-install
```

- `--package-manager npm`: npm을 패키지 관리자로 지정
- `--skip-git`: Git 저장소 초기화를 건너뜀
- `--skip-install`: 의존성 설치를 나중에 수동으로 진행

### 4. 의존성 설치

프로젝트의 `package.json` 파일에 정의된 모든 의존성을 설치합니다.

```bash
npm install
```

### 5. 기본 구조 확인

프로젝트가 성공적으로 생성되면 다음과 같은 구조가 만들어집니다:

```
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts
```

### 6. 모듈, 컨트롤러, 서비스 생성 (선택사항)

필요한 기능에 따라 추가 모듈을 생성합니다.

```bash
# 모듈 생성
nest generate module mp4

# 컨트롤러 생성
nest generate controller mp4

# 서비스 생성
nest generate service mp4
```

### 7. 애플리케이션 빌드

TypeScript 코드를 JavaScript로 컴파일하여 빌드합니다.

```bash
npm run build
```

### 8. 애플리케이션 실행

개발 모드로 애플리케이션을 실행합니다.

```bash
npm run start:dev
```

기본적으로 `http://localhost:3000`에서 애플리케이션이 실행됩니다.

## 추가 설정

### CORS 활성화 (필요시)

크로스-오리진 요청을 허용하려면 `main.ts` 파일을 수정합니다.

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // CORS 활성화
  await app.listen(3000);
}
bootstrap();
```

### 환경 변수 설정

`.env` 파일을 생성하여 환경 변수를 관리합니다.

```bash
# .env
PORT=3000
```

## 문제 해결

- **빌드 오류**: TypeScript 오류가 발생하면 `src/` 디렉토리의 파일들을 확인하세요. 데코레이터 관련 오류는 `import type`을 사용하세요.
- **포트 충돌**: 기본 포트 3000이 사용 중이면 `main.ts`에서 포트를 변경하세요.
- **의존성 문제**: `npm install`을 다시 실행하거나 `node_modules`를 삭제 후 재설치하세요.

## 다음 단계

프로젝트가 초기화된 후, 필요한 기능을 구현하세요. 예를 들어, 컨트롤러에 엔드포인트를 추가하거나 서비스에 비즈니스 로직을 작성할 수 있습니다.