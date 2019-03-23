const { ApolloServer } = require('apollo-server-lambda');
const typeDefs = require('./schema/types');
const resolvers = require('./schema/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: '/v1/graphql',
  },
});

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
