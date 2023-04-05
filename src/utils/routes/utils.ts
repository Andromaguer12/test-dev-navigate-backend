/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Router } from 'express';
import { EndpointsRequestMethods } from '../../typesDefs/routes/enums';
import { CustomRoutesProps, EndpointsRoutes } from '../../typesDefs/routes/types';
import passport from 'passport';
const router = express.Router();

export const routerEngine = (epRoutes: EndpointsRoutes[]): { api: Router } => {
  epRoutes.forEach((route: EndpointsRoutes | any) => {
    const p2 = (req: any, res: any) => (customProps: CustomRoutesProps) => route.controller(req, res, customProps);
    const methodPublic = (isPriv: string | null): Router =>
      router[route.method as EndpointsRequestMethods](route.epRoute, (r1, r2) => p2(r1, r2)({ isPriv }));
    const methodPrivate = (isPriv: string | null): Router =>
      router[route.method as EndpointsRequestMethods](
        route.epRoute,
        passport.authenticate('jwt', { session: false }),
        (r1, r2) => p2(r1, r2)({ isPriv }),
      );
    const privateCondition = route.isPrivate ? 'isPrivate' : null;
    const method = route.isPrivate ? methodPrivate : methodPublic;
    return method(privateCondition);
  });

  return { api: router };
};
