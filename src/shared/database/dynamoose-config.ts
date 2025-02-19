import 'dotenv/config';
import * as dynamoose from 'dynamoose';

const ddb = new dynamoose.aws.ddb.DynamoDB({
  credentials: {
    accessKeyId: String(process.env.AWS_ACCESS_KEY_ID),
    secretAccessKey: String(process.env.AWS_SECRET_ACCESS_KEY),
  },
  region: 'us-east-1',
});

if (process.env.STAGE == 'local') {
  dynamoose.aws.ddb.local();
} else {
  dynamoose.aws.ddb.set(ddb);
}

export default dynamoose;
