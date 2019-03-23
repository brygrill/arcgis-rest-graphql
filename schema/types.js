const { gql } = require('apollo-server');

const typeDefs = gql`
  scalar JSON

  type Field {
    name: String
    type: String
    alias: String
    length: Int
  }

  type SR {
    wkid: Int
    latestWkid: Int
  }

  type Feature {
    attributes: JSON
    geometry: JSON
  }

  type Results {
    displayFieldName: String
    fieldAliases: JSON
    geometryType: String
    spatialReference: SR
    fields: [Field]
    features: [Feature]
    featureCount: Int
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
    # TODO: arcgis REST api
  }
`;

module.exports = typeDefs;
