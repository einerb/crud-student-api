import { Module } from '@nestjs/common';

import { ConfigModule } from '../infrastructure/config/config.module';
import { ConfigService } from '../infrastructure/config/config.service';
import { Config } from '../infrastructure/config/config.enum';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [ConfigModule, DatabaseModule, StudentModule],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly configService: ConfigService) {
    AppModule.port = this.configService.get(Config.SERVER_PORT);
  }
}
