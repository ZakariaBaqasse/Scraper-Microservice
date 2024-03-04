import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { htmlToText } from 'html-to-text';

@Injectable()
export class HtmlParserService {
  async parseURL(url: string): Promise<string> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
          'Upgrade-Insecure-Requests': '1',
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9,en;q=0.8',
        },
        timeout: 15 * 1000,
      });

      const $ = cheerio.load(response.data);
      const content = $('body').html();

      return htmlToText(content);
    } catch (error) {
      const message = `Error parsing URL: ${url} with error: ${error}`;
      console.error(message);
      throw new Error(message);
    }
  }
}
