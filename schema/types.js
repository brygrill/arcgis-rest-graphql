const { gql } = require('apollo-server');

const typeDefs = gql`
  type Results {
    displayFieldName: String
  }

  type Field {
    name: String
    type: String
    alias: String
  }

  # Info for a specific layer by id
  type Layer {
    id: Int
    name: String
    type: String
    description: String
    fields: [Field]
  }

  # Root info service
  type Service {
    currentVersion: Float
    mapName: String
    description: String
    serviceDescription: String
    copyrightText: String
    layers: String
    query(id: Int!, where: String): Results
    layer(id: Int!): Layer
  }

  type Query {
    service(url: String!, token: String): Service
  }
`;

module.exports = typeDefs;
