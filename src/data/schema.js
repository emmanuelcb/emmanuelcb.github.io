import { gql } from '@apollo/client';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    avatar: String
    repositories: [Repository!]!
  }

  type Repository {
    id: ID!
    name: String!
    description: String
    stars: Int
    forks: Int
    primaryLanguage: String
    lastUpdated: String
    url: String!
  }

  type Query {
    currentUser: User
    repository(id: ID!): Repository
    searchRepositories(query: String!): [Repository!]!
  }
`;

export const mocks = {
  User: () => ({
    id: '1',
    username: 'devuser',
    avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
  }),
  Repository: () => ({
    id: () => Math.floor(Math.random() * 1000).toString(),
    name: () => {
      const names = ['awesome-project', 'react-app', 'graphql-demo', 'code-samples', 'portfolio'];
      return names[Math.floor(Math.random() * names.length)];
    },
    description: () => {
      const descriptions = [
        'A sample project demonstrating React and GraphQL',
        'Open source project for learning purposes',
        'Repository containing code examples',
        'Personal portfolio project',
      ];
      return descriptions[Math.floor(Math.random() * descriptions.length)];
    },
    stars: () => Math.floor(Math.random() * 500),
    forks: () => Math.floor(Math.random() * 100),
    primaryLanguage: () => {
      const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go'];
      return languages[Math.floor(Math.random() * languages.length)];
    },
    lastUpdated: () => new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    url: () => 'https://github.com/devuser/' + Math.random().toString(36).substring(7),
  }),
};