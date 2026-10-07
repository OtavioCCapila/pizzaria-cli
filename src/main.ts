import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CliService } from './modules/cli/cli.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const cli = app.get(CliService);
  await cli.run();

  await app.close();
}

void bootstrap();
