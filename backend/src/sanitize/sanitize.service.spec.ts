import { Test, TestingModule } from '@nestjs/testing';
import { SanitizeService } from './sanitize.service';

describe('SanitizeService', () => {
  let service: SanitizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SanitizeService],
    }).compile();

    service = module.get<SanitizeService>(SanitizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
