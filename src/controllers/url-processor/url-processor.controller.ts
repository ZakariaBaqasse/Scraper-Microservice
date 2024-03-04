import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UrlProcessorService } from 'src/services/url-processor/url-processor.service';

@Controller('url-processor')
export class UrlProcessorController {
  constructor(private readonly urlProcessorService: UrlProcessorService) {}

  @MessagePattern('process-url')
  async processUrl(data: any): Promise<any> {
    return await this.urlProcessorService.processUrl(data);
  }
}
