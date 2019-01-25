import { GraphQLServer } from 'graphql-yoga';

import { prisma } from '../generated/prisma-client';
import resolvers from './resolvers';

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers: resolvers,
  context: req => ({ ...req, prisma })
});

server.start(async () => {
  console.log("CRMServer is running on http://localhost:4000");
});
