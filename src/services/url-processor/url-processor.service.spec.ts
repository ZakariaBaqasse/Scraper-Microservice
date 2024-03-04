import { Test, TestingModule } from '@nestjs/testing';
import { UrlProcessorService } from './url-processor.service';

describe('UrlProcessorService', () => {
  let service: UrlProcessorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlProcessorService],
    }).compile();

    service = module.get<UrlProcessorService>(UrlProcessorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
