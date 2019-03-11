/* eslint-disable no-console */
const axios = require('axios');
const { ApolloError } = require('apollo-server');

const resolvers = {
  Service: {
    layers() {
      return 'TODO:';
    },
    query() {
      return 'TODO:';
    },
  },
  Query: {
    async service(_, args) {
      const { url, token } = args;
      try {
        const { data } = await axios.get(url, {
          params: {
            token,
            f: 'json',
          },
        });
        console.log(data);
        return data;
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
};

module.exports = resolvers;
