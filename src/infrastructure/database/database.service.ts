import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { Config } from '../config/config.enum';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(configService: ConfigService) {
      return {
        type: configService.get(Config.DB_TYPE),
        host: configService.get(Config.DB_HOST),
        port: parseInt(configService.get(Config.DB_PORT)),
        database: `./data/${configService.get(Config.DB_NAME)}.sqlite`,
        entities: [__dirname + '/**/*.model{.ts,.js}'],
        synchronize: true,
        logging: process.env.NODE_ENV.trim() === 'development',
        retryAttempts: 10,
        retryDelay: 3000,
        autoLoadEntities: true,
        keepConncetionAlive: true,
      } as TypeOrmModuleOptions;
    },
  }),
];
