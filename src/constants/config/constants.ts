import express from 'express';
const app = express();

const isDev: boolean = app.get('env') === 'development' ? true : false;

interface MongoConfigVars {
  jwtSecret: string;
  MONGODB: {
    URI: string;
  };
}

const configs = (): MongoConfigVars => ({
  jwtSecret: process.env.JWT_SECRET || 'token',
  MONGODB: {
    URI: isDev ? 'mongodb://localhost/test-app-db' : 'PRUEBA',
  },
});

export default configs;
