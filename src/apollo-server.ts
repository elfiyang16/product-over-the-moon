const { ApolloServer, gql } = require('apollo-server-lambda');
const { resolvers } = require('./resolvers');
const { typeDefs } = require('./type-defs');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
exports.graphqlHandler = handler;
