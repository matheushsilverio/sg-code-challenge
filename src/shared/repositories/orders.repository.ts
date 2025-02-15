import { DynamoDB } from 'aws-sdk';

export interface Order {
  orderId: string;
  userId: string;
  items: Array<{
    itemId: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  status: string;
  totalPrice: number;
  createdAt: string;
  updatedAt?: string;
}

export default class OrderRepository {
  private tableName: string;

  constructor(private client: DynamoDB.DocumentClient, tableName?: string) {
    const stage = process.env.STAGE || 'local';
    this.tableName = tableName || `${stage}-orders`;
  }

  async create(order: Order): Promise<Order> {
    const params = {
      TableName: this.tableName,
      Item: order,
    };

    await this.client.put(params).promise();
    return order;
  }

  async getById(orderId: string): Promise<Order | null> {
    const params = {
      TableName: this.tableName,
      Key: { orderId },
    };

    const result = await this.client.get(params).promise();
    return (result.Item as Order) || null;
  }

  async getByUserId(userId: string): Promise<Order[]> {
    const params = {
      TableName: this.tableName,
      IndexName: 'userIdIndex',
      KeyConditionExpression: 'userId = :u',
      ExpressionAttributeValues: {
        ':u': userId,
      },
    };

    const result = await this.client.query(params).promise();
    return (result.Items as Order[]) || [];
  }

  async updateStatus(orderId: string, status: string): Promise<Order | null> {
    const params = {
      TableName: this.tableName,
      Key: { orderId },
      UpdateExpression: 'set #s = :s, updatedAt = :u',
      ExpressionAttributeNames: { '#s': 'status' },
      ExpressionAttributeValues: {
        ':s': status,
        ':u': new Date().toISOString(),
      },
      ReturnValues: 'ALL_NEW',
    };

    const result = await this.client.update(params).promise();
    return (result.Attributes as Order) || null;
  }

  async delete(orderId: string): Promise<void> {
    const params = {
      TableName: this.tableName,
      Key: { orderId },
    };

    await this.client.delete(params).promise();
  }
}
