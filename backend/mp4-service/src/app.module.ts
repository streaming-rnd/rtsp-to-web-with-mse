import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Mp4Module } from './mp4/mp4.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'htdocs'),
      serveRoot: '/play-with-mp4',
    }),
    Mp4Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
