import { prisma } from '../../generated/prisma-client';

const ConsultingRecord = {
  user: (parent, args, ctx) => prisma.consultingRecord({ id: parent.id }).user()
};

export default ConsultingRecord;
