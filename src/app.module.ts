import { Module } from '@nestjs/common';
import { UrlProcessorController } from './controllers/url-processor/url-processor.controller';
import { UrlProcessorService } from './services/url-processor/url-processor.service';
import { ContentOptimizerService } from './services/content-optimizer/content-optimizer.service';
import { ParserService } from './services/parser/parser.service';
import { HtmlParserService } from './services/html-parser/html-parser.service';
import { PdfParserService } from './services/pdf-parser/pdf-parser.service';
import { LoggerService } from './services/logger/logger.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot()],
  controllers: [UrlProcessorController],
  providers: [
    UrlProcessorService,
    ContentOptimizerService,
    ParserService,
    HtmlParserService,
    PdfParserService,
    LoggerService,
  ],
})
export class AppModule {}
