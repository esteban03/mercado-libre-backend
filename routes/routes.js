import indexRouter from './index.js';
import itemsRouter from './items.js';

export default function registerRoutes(app) {
  app.use('/', indexRouter);
  app.use('/api/items', itemsRouter);
}
