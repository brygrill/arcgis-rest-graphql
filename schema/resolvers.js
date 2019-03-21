/* eslint-disable no-console */
const { ApolloError } = require('apollo-server');
const axios = require('axios');

const resolvers = {
  Service: {
    async layer(_, { id }, { fetch }) {
      try {
        const { data } = await fetch.get(`/${id}`);
        return data;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    query() {
      return 'TODO:';
    },
  },
  Query: {
    async service(_, args, ctx) {
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
  },
};

module.exports = resolvers;
