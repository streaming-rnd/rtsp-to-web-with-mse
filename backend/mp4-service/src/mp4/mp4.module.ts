import { Module } from '@nestjs/common';
import { Mp4Controller } from './mp4.controller';
import { Mp4Service } from './mp4.service';

@Module({
  controllers: [Mp4Controller],
  providers: [Mp4Service]
})
export class Mp4Module {}
