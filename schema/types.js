const { gql } = require('apollo-server');

const typeDefs = gql`
  # ***** Start ArcGIS Server *****
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

  type Layer {
    id: Int
    name: String
    type: String
    description: String
    fields: [Field]
  }

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

  # ***** Start AGOL *****
  type User {
    username: String
    id: String
    fullName: String
  }

  type AGOL {
    user(userName: String!): User
  }

  # ***** Root *****
  type Query {
    # ArcGIS Server Services
    service(url: String!, token: String): Service
    # ArcGIS REST API (AGOL or Portal)
    agol(url: String): AGOL
  }
`;

module.exports = typeDefs;
