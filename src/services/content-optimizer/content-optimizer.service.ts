import { Injectable } from '@nestjs/common';
import { Document } from 'langchain/document';
import { TokenTextSplitter } from 'langchain/text_splitter';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { OpenAIEmbeddings } from '@langchain/openai';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class ContentOptimizerService {
  constructor(private readonly logger: LoggerService) {}

  async optimizeContent(content: string, query: string): Promise<string> {
    try {
      const docs = await this.splitToDocs(content);
      return this.getRelevantContent(docs, query);
    } catch (error) {
      const message = `Error optimizing content: ${content} with error: ${error}`;
      this.logger.error(message);
      throw new Error(message);
    }
  }

  async splitToDocs(content: string): Promise<Document[]> {
    try {
      const splitter = new TokenTextSplitter({
        encodingName: 'gpt2',
        chunkSize: 1000,
        chunkOverlap: 100,
      });
      return await splitter.createDocuments([content]);
    } catch (error) {
      const message = `Error optimizing content: ${content} with error: ${error}`;
      this.logger.error(message);
      throw new Error(message);
    }
  }

  async getRelevantContent(docs: Document[], query: string): Promise<string> {
    try {
      const vectorStore = await MemoryVectorStore.fromDocuments(
        docs,
        new OpenAIEmbeddings({
          modelName: 'text-embedding-3-small',
          openAIApiKey: process.env.OPENAI_API_KEY,
        }),
      );
      const similarDocs = await vectorStore.similaritySearch(query, 5);
      return similarDocs.map((doc) => doc.pageContent).join('\n');
    } catch (error) {
      const message = `Error getting relevant content for query: ${query} with error: ${error}`;
      this.logger.error(message);
      throw new Error(message);
    }
  }
}
