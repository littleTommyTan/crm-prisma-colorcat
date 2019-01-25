import { prisma } from '../../generated/prisma-client';

const Surgery = {
  bill: (parent, args, ctx) => prisma.surgery({ id: parent.id }).bill()
};

export default Surgery;
