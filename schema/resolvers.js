/* eslint-disable no-console */
const { ApolloError } = require('apollo-server');
const _ = require('lodash');
const axios = require('axios');
const GraphQLJSON = require('graphql-type-json');

const resp = data => {
  if (_.has(data, 'error')) {
    throw new ApolloError(data.error.message);
  }
  return data;
};

const resolvers = {
  // ***** Start ArcGIS Server *****
  JSON: GraphQLJSON,
  Results: {
    featureCount(results) {
      return results.features.length;
    },
  },
  Service: {
    async layer(__, { id }, { fetch }) {
      try {
        const { data } = await fetch.get(`/${id}`);
        return data;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async query(__, { id, where }, { fetch }) {
      try {
        const whereClause = where || '1=1';
        const { data } = await fetch.get(`/${id}/query`, {
          params: {
            where: whereClause,
          },
        });
        return data;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  // ***** Start AGOL *****
  AGOL: {
    async user(__, { userName }, { fetch }) {
      try {
        const { data } = await fetch.get(`/users/${userName}`);
        console.log(data);
        return resp(data);
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  // ***** Root *****
  Query: {
    async service(__, args, ctx) {
      // get args
      const { url, token } = args;

      // set axios instance
      const fetch = axios.create({
        baseURL: url,
        timeout: 5000,
        params: {
          token,
          f: 'json',
        },
      });

      // add instance to context
      ctx.fetch = fetch;

      // fetch service info
      try {
        const { data } = await fetch.get('/');
        return data;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async agol(__, args, ctx) {
      // get args
      // const { url, token } = args;

      // set axios instance
      const fetch = axios.create({
        baseURL: 'https://www.arcgis.com/sharing/rest/community',
        timeout: 5000,
        params: {
          // token,
          f: 'json',
        },
      });

      // add instance to context
      ctx.fetch = fetch;

      return { __, args, ctx };
    },
  },
};

module.exports = resolvers;
