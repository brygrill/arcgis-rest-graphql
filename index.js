/* eslint-disable no-console */
const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema/types');
const resolvers = require('./schema/resolvers');

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
