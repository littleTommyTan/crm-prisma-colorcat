import { prisma } from '../../generated/prisma-client';

const Treatment = {
  bill: (parent, args, ctx) => prisma.treatment({ id: parent.id }).bill()
};

export default Treatment;
