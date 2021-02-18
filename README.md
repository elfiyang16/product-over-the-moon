#### Serverless GraphQL Lambda to Send Your Product Over the Moon

##### Features

- TypeScript
- Webpack configured
- DynamoDB with lastest aws sdk client
- GraphQL
- Offline support

##### Config

To install all the packages:

```
npm i
```

Start on development -- this will start the apollo server on the serverless offline mode.

```
npm start
```

And then you are free to test the api with endpoints:

```
   |   POST | http://localhost:3000/dev/graphql                                │
   │   POST | http://localhost:3000/2015-03-31/functions/graphql/invocations   │
   │   GET  | http://localhost:3000/dev/graphql                                │
   │   POST | http://localhost:3000/2015-03-31/functions/graphql/invocations
```

![Feb-18-2021 07-51-02 (1)](https://user-images.githubusercontent.com/29664811/108323500-a7ed3e00-71be-11eb-93ee-2ed1cc5cc97a.gif)

To deploy, simply:

```
serverless deploy
```

The console will print out info like:

```
Serverless: Package lock found - Using locked versions
Serverless: Packing external modules: apollo-server-lambda@^2.16.1, graphql@^15.3.0, @aws-sdk/util-dynamodb@^3.1.0, @aws-sdk/client-dynamodb@^3.1.0, uuidv4@^6.2.6
Serverless: Packaging service...
Serverless: Uploading CloudFormation file to S3...
Serverless: Uploading artifacts...
Serverless: Uploading service product-on-the-cloud.zip file to S3 (9.21 MB)...
Serverless: Validating template...
Serverless: Updating Stack...
Serverless: Checking Stack update progress...
.......................................
Serverless: Stack update finished...
Service Information
service: product-on-the-cloud
stage: dev
region: eu-west-1
stack: product-on-the-cloud-dev
resources: 14
api keys:
  None
endpoints:
  POST - https://69ggn85smc.execute-api.eu-west-1.amazonaws.com/dev/graphql
  GET - https://69ggn85smc.execute-api.eu-west-1.amazonaws.com/dev/graphql
functions:
  graphql: product-on-the-cloud-dev-graphql
layers:
  None
```

Note `https://69ggn85smc.execute-api.eu-west-1.amazonaws.com/dev/graphql` will be your AWS API Gateway endpoint.

Check on the AWS console:
<img src="https://user-images.githubusercontent.com/29664811/108322074-ea158000-71bc-11eb-937c-f84f0994e157.png" width="600">
<img src="https://user-images.githubusercontent.com/29664811/108322322-3bbe0a80-71bd-11eb-8d6f-135d8015d104.png" width="600">
<img src="https://user-images.githubusercontent.com/29664811/108322519-758f1100-71bd-11eb-838b-c7d74f9c5b7f.png" width="600">

##### AWS Setup

The resolver currently fetches Data from a DynamoDB called `ProductInfo`, it is created the first time you deploy your lambda function as defined in the serverless.yml file. You may need to config your aws profile separately and settup IAM permissions accordingly on the deployed lambda on the AWS console.
