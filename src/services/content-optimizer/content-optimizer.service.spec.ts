import { Test, TestingModule } from '@nestjs/testing';
import { ContentOptimizerService } from './content-optimizer.service';

describe('ContentOptimizerService', () => {
  let service: ContentOptimizerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentOptimizerService],
    }).compile();

    service = module.get<ContentOptimizerService>(ContentOptimizerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
