import { Test, TestingModule } from '@nestjs/testing';
import { Mp4Controller } from './mp4.controller';

describe('Mp4Controller', () => {
  let controller: Mp4Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Mp4Controller],
    }).compile();

    controller = module.get<Mp4Controller>(Mp4Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
