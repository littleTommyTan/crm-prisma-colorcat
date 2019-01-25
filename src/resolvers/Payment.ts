import { prisma } from '../../generated/prisma-client';

const Payment = {
  bill: (parent, args, ctx) => prisma.payment({ id: parent.id }).bill()
};

export default Payment;
