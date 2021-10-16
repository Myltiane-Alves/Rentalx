import { Router } from 'express';
import { ensureAuthenticated } from '@shared/infra/htpp/middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '@modules/cars/usesCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', createSpecificationController.handle);
specificationsRoutes.use(ensureAuthenticated);

export { specificationsRoutes }