import { GraphQLServer } from 'graphql-yoga';

import { prisma } from '../generated/prisma-client';
import resolvers from './resolvers';
import scheduleDataFetch from './schedule';

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  context: req => ({ ...req, prisma })
});

server.start(async () => {
  // await scheduleDataFetch();
  console.log("Server is running on http://localhost:4000");
});
