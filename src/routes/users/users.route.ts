import { EndpointsRequestMethods } from '../../typesDefs/routes/enums';
import { EndpointsRoutes } from '../../typesDefs/routes/types';
import { routerEngine } from '../../utils/routes/utils';
import { DeleteUserController, LoginController, RegisterUserController, UpdateUserController } from './controllers/users.controllers';

const routes: EndpointsRoutes[] = [
  {
    epRoute: '/register-user',
    controller: RegisterUserController as unknown as void,
    isPrivate: false,
    method: EndpointsRequestMethods.POST,
  },
  {
    epRoute: '/login',
    controller: LoginController as unknown as void,
    isPrivate: false,
    method: EndpointsRequestMethods.POST,
  },
  {
    epRoute: '/update-user-info',
    controller: UpdateUserController as unknown as void,
    isPrivate: true,
    method: EndpointsRequestMethods.POST,
  },
  {
    epRoute: '/delete-user',
    controller: DeleteUserController as unknown as void,
    isPrivate: false,
    method: EndpointsRequestMethods.DELETE,
  },
];

export default routerEngine(routes);
