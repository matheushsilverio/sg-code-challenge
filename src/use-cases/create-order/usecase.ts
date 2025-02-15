import { APIGatewayProxyStructuredResultV2 } from 'aws-lambda';
import {
  UseCase,
  executeParamsType,
} from '../../shared/interfaces/usecase.interface';
import { successResponse } from '../../shared/api-gateway-response';

export default class CreateOrderUseCase implements UseCase {
  constructor() {}

  async execute(
    params: executeParamsType,
  ): Promise<APIGatewayProxyStructuredResultV2> {
    const { body } = params;

    return successResponse({ body });
  }
}
