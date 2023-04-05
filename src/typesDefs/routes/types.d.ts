/* eslint-disable @typescript-eslint/no-explicit-any */
import { EndpointsRequestMethods } from './enums';

export type CustomRoutesProps = {
  isPriv: string | null;
};

export type EndpointsRouteType = {
  rootUrl: string;
  module: any;
  routeId: string;
};

export interface EndpointsRoutes {
  epRoute: string;
  controller: Promise<void> | void;
  method: EndpointsRequestMethods;
  isPrivate: boolean;
}
