import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import configs from './constants/config/constants';
import initConnection from './config/mongoDatabase';
import passport from 'passport';
import userPassportAuthorization from './middlewares/auth/passport';
import usersRoute from './routes/users/users.route';

const executeServer = () => {
  const app = express();

  // applying middlewares
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    }),
  );
  app.use(express.json());
  app.use(passport.initialize());
  passport.use(userPassportAuthorization);

  // routes
  app.use('/api/users', usersRoute.api);

  // connection to mongodb data base
  const URI = configs().MONGODB.URI;
  initConnection(URI);

  // execute port
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => {
    console.log(`my test-app-back server is running in port: ${PORT}`);
  });
};

executeServer();
