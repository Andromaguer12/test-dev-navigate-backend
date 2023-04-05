/* eslint-disable @typescript-eslint/no-explicit-any */
import { Strategy, ExtractJwt, StrategyOptions } from 'passport-jwt';
import configs from '../../constants/config/constants';
import { getUser } from '../../routes/users/resolvers/users.service';
import currentErrorInterface from '../../routes/users/errors';
import { UserTokenPayload } from '../../routes/typesDefs/users/types';

const handleErrors = (flag: string) => currentErrorInterface({ flag });

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: configs().jwtSecret,
};

export default new Strategy(options, async (payload: UserTokenPayload, done: (p1: any, p2: any) => void) => {
  try {
    const exists = await getUser(payload?.email);
    if (exists) {
      return done(null, exists);
    } else {
      done(null, null);
      throw new Error(handleErrors('user-with-email-' + payload.email).INVALID_AUTHORIZATION);
    }
  } catch (error) {
    throw new Error(error as string);
  }
});
