import { Test, TestingModule } from '@nestjs/testing';
import { UrlProcessorController } from './url-processor.controller';

describe('UrlProcessorController', () => {
  let controller: UrlProcessorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UrlProcessorController],
    }).compile();

    controller = module.get<UrlProcessorController>(UrlProcessorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
