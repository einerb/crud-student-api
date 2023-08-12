import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigModule } from './config.module';
import { ConfigService } from './config.service';
import { Config } from './config.enum';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(configService: ConfigService) {
      return {
        type: configService.get(Config.DB_TYPE),
        host: configService.get(Config.DB_HOST),
        port: parseInt(configService.get(Config.DB_PORT)),
        database: configService.get(Config.DB_NAME),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        subscribers: ['dist/**/**/**/*.subscriber{.ts,.js}'],
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
