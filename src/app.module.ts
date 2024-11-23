import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test.controller';
import { Test2Controller } from './test2/test2.controller';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

const entitiesPath = __dirname + '/**/*.entity{.ts,.js}';

let typeOrmConfig = {};

const env = process.env.NODE_ENV;

console.log('✅✅✅env', env);

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,

    TypeOrmModule.forRoot(
      env === 'test'
        ? {
            type: 'postgres',
            host: process.env.TEST_DB_HOST,
            port: 5432,
            username: process.env.TEST_DB_USERNAME, //'postgres',
            password: process.env.TEST_DB_PASSWORD,
            database: process.env.TEST_DB_NAME,
            autoLoadEntities: true,
            entities: [entitiesPath],
            synchronize: true,
            migrationsRun: true,
            logging: false,
          }
        : {
            type: 'postgres',
            host: process.env.DB_HOST,
            port: 5432,
            username: process.env.DB_USERNAME, //'postgres',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            autoLoadEntities: true,
            entities: [entitiesPath],
            synchronize: false,
            migrationsRun: true,
            logging: false,
          },
    ),
  ],
  controllers: [AppController, TestController, Test2Controller],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
