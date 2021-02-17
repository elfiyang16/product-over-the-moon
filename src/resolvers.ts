const { unmarshall, marshall } = require('@aws-sdk/util-dynamodb');
const {
  DynamoDBClient,
  ScanCommand,
  GetItemCommand,
  QueryCommand,
  PutItemCommand,
} = require('@aws-sdk/client-dynamodb');
const { uuid } = require('uuidv4');
const client = new DynamoDBClient({ region: 'eu-west-1' });

const TABLENAME = 'ProductInfo';

// Get Product By Id
const getProductById = async (id) => {
  const params = {
    TableName: TABLENAME,
    Key: marshall({
      id: id,
    }),
  };

  try {
    const results = await client.send(new GetItemCommand(params));
    let product: any;
    product = unmarshall(results.Item);
    return product;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Get Products (scan)

const getProducts = async () => {
  const params = {
    TableName: TABLENAME,
  };

  try {
    const results = await client.send(new ScanCommand(params));
    const products = [];
    results.Items.forEach((item) => {
      // convert the DynamoDB JSON format to plain JSON
      //@ts-ignore
      products.push(unmarshall(item));
    });
    return products;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Get Product By Name

const getProductByName = async (name) => {
  const params = {
    TableName: TABLENAME,
    IndexName: 'name-index',
    KeyConditionExpression: '#inputName = :inputName',
    ExpressionAttributeValues: {
      ':inputName': { S: name },
    },
    ExpressionAttributeNames: {
      '#inputName': 'name',
    },
  };

  try {
    const results = await client.send(new QueryCommand(params));
    if (results.Items && results.Items.length > 0) {
      let product = unmarshall(results.Items[0]);
      return product;
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

// ====================================

export const resolvers = {
  Query: {
    products: () => {
      return getProducts();
    },
    product: (root, args) => {
      return getProductById(args.id);
    },
    productByName(root, args) {
      return getProductByName(args.name);
    },
  },
};
