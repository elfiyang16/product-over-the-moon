const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({ region: 'eu-west-1' });

const TABLENAME = 'ProductInfo';

export const resolvers = {};
