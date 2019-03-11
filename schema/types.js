const { gql } = require('apollo-server');

const typeDefs = gql`
  # Root url for a service
  type Service {
    currentVersion: Float
    mapName: String
    description: String
    serviceDescription: String
    copyrightText: String
    layers: String
    query: String
  }

  type Query {
    service(url: String!, token: String): Service
  }
`;

module.exports = typeDefs;
