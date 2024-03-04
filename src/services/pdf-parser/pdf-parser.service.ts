import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as pdf from 'pdf-parse';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class PdfParserService {
  constructor(
    private readonly httpService: HttpService,
    private readonly logger: LoggerService,
  ) {}

  async parseURL(url: string): Promise<string> {
    try {
      const response = await this.httpService.axiosRef({
        url,
        method: 'GET',
        responseType: 'arraybuffer',
        timeout: 15 * 1000,
      });
      const buffer = Buffer.from(response.data, 'binary');
      return pdf(buffer).then(
        (data: any) => {
          return data.text;
        },
        (error: any) => {
          this.logger.error(
            `Failed to parse pdf url: ${url} with error: ${error}`,
          );
          return '';
        },
      );
    } catch (e) {
      throw new Error(`Failed to parse pdf url: ${url} with error: ${e}`);
    }
  }
}
