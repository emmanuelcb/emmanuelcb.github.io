import { ApolloClient, InMemoryCache, HttpLink, makeVar } from '@apollo/client';
import { typeDefs, mocks } from './data/schema';
import { SchemaLink } from '@apollo/client/link/schema';
import { addMocksToSchema } from '@graphql-tools/mock';
import { makeExecutableSchema } from '@graphql-tools/schema';

const schema = makeExecutableSchema({ typeDefs });
const schemaWithMocks = addMocksToSchema({ schema, mocks });

export const favoriteReposVar = makeVar([]);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        favoriteRepos: {
          read() {
            return favoriteReposVar();
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  link: new SchemaLink({ schema: schemaWithMocks }),
  cache,
  typeDefs,
});

export default client;