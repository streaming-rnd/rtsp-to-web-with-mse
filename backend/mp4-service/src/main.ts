import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const startPort = process.env.PORT ? parseInt(process.env.PORT) : 4000;
  let port = startPort;

  while (true) {
    try {
      // SO_REUSEADDR 설정으로 포트 재사용 허용
      const server = app.getHttpAdapter().getInstance();
      server.set('reuseAddr', true);
      await app.listen(port);
      console.log(`Application is running on: http://localhost:${port}`);
      break;
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is in use, trying ${port + 1}...`);
        port++;
      } else {
        throw err;
      }
    }
  }
}
bootstrap();
