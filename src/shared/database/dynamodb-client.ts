import { DynamoDB } from 'aws-sdk';

let options: { region: string; endpoint?: string } = {
  region: process.env.AWS_REGION || 'us-east-1',
};

if (process.env.STAGE === 'local') {
  options = {
    region: 'localhost',
    endpoint: 'http://localhost:8000',
  };
}

const dynamoDB = new DynamoDB.DocumentClient(options);

export default dynamoDB;
