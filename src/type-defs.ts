import { gql } from 'apollo-server-lambda';

export const typeDefs = gql`
  scalar JSON
  type Product {
    id: ID!
    name: String
    quantity: String
    vendor: String
    vendor_email: String
  }
  type Query {
    products: [Product]
    product(id: ID!): Product
    productByName(name: String!): Product
  }
  type Mutation {
    addProduct(input: AddProductInput!): Product
  }
  input AddProductInput {
    name: String!
    quantity: String!
    vendor: String!
    vendor_email: String!
  }
`;
