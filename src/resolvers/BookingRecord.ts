import { prisma } from '../../generated/prisma-client';

const BookingRecord = {
  user: (parent, args, ctx) => prisma.bookingRecord({ id: parent.id }).user(),
  consultationRecord: (parent, args, ctx) =>
    prisma.bookingRecord({ id: parent.id }).consultationRecord()
};

export default BookingRecord;
