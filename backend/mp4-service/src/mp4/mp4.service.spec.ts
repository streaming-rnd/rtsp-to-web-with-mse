import { Test, TestingModule } from '@nestjs/testing';
import { Mp4Service } from './mp4.service';

describe('Mp4Service', () => {
  let service: Mp4Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Mp4Service],
    }).compile();

    service = module.get<Mp4Service>(Mp4Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
