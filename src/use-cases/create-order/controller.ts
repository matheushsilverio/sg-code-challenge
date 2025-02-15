import { Handler } from 'aws-lambda';
import { BaseController } from '../../shared/base.controller';
import CreateOrderUseCase from './usecase';

class CreateOrderController extends BaseController {
  constructor() {
    const useCase = new CreateOrderUseCase();
    super(useCase);
  }
}
const controller = new CreateOrderController();
export const handler: Handler = controller.handle.bind(controller);
