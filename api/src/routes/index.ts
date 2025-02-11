import user from './user';
import build from './build';

const mountedRoutes = (app: any) => {
  app.use('/users', user);
  app.use('/builds', build);
};

export default mountedRoutes;
