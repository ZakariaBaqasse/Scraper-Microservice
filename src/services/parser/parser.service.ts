import { Injectable } from '@nestjs/common';
import { HtmlParserService } from '../html-parser/html-parser.service';
import { PdfParserService } from '../pdf-parser/pdf-parser.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ParserService {
  constructor(
    private readonly htmlService: HtmlParserService,
    private readonly pdfService: PdfParserService,
    private readonly logger: LoggerService,
  ) {}

  async parseURL(url: string): Promise<string> {
    try {
      if (url.endsWith('.pdf')) {
        return await this.pdfService.parseURL(url);
      } else {
        return await this.htmlService.parseURL(url);
      }
    } catch (error) {
      const message = `Error parsing URL: ${url} with error: ${error}`;
      this.logger.error(message);
      throw new Error(message);
    }
  }
}
