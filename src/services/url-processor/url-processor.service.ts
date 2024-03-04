import { ContentOptimizerService } from '../content-optimizer/content-optimizer.service';
import { Injectable } from '@nestjs/common';
import { ParserService } from '../parser/parser.service';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UrlProcessorService {
  constructor(
    private readonly scraper: ParserService,
    private readonly optimizer: ContentOptimizerService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * Processes a URL and returns a result object.
   *
   * @param {Object} data - The data object.
   * @param {string} data.searchId - The search ID.
   * @param {string} data.sectionId - The section ID.
   * @param {string} data.url - The URL to process.
   * @param {string} data.projectId - The project ID.
   * @param {string} data.subject - The subject for content optimization.
   *
   * @returns {Object} result - The result object.
   * @returns {string} result.url - The processed URL.
   * @returns {string} result.context - The context after URL processing and content optimization.
   * @returns {string} [result.searchId] - The search ID (if provided).
   * @returns {string} [result.sectionId] - The section ID (if provided).
   * @returns {string} [result.projectId] - The project ID (if provided).
   *
   * @throws {Error} Will throw an error if the URL processing fails or if the data is invalid.
   *
   * @async
   */
  async processUrl(data: any) {
    const { searchId, sectionId, url, projectId, subject } = data;
    let context;

    try {
      console.log('redis microservice received data', JSON.stringify(data));
      context = await this.scraper.parseURL(url.url ? url.url : url);
      console.log('context', context.substring(0, 100));
      context = await this.optimizer.optimizeContent(context, subject);
      context = this.prepareContext(context);
    } catch (error) {
      console.log('error parsing url, returning null');
      this.logger.error(
        `UrlProcessorService: Error in transcode: ${error.message}`,
      );
    }

    const result: {
      url: any;
      context: any;
      searchId?: any;
      sectionId?: any;
      projectId?: any;
    } = { url, context };

    if (searchId && sectionId) {
      result.searchId = searchId;
      result.sectionId = sectionId;
    } else if (projectId && sectionId) {
      result.projectId = projectId;
      result.sectionId = sectionId;
    } else if (projectId) {
      result.projectId = projectId;
    } else {
      throw new Error('UrlProcessorService: Invalid data');
    }

    return result;
  }

  prepareContext(content: string): string {
    // remove all { and } from the content to avoid issues with the prompt
    return content.replace(/{|}/g, '');
  }
}
