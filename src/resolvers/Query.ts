import { prisma } from '../../generated/prisma-client';
import ConsultingRecord from './ConsultingRecord';

export interface UserDetail {
  id: String;
  name: String;
  vipLevel: String;
  age: String;
  where: String;
  bigFrom: String;
  mainProject: String;
  createdAt: String;
  sex: String;
}

const Query = {
  usersDetailWDView: async () => {
    const ret = [];
    let users = await prisma.userBasics();
    for (const user of users) {
      const consultations = await prisma.consultingRecords({
        where: { user: { id: user.id } },
        first: 1
      });
      const consultationCount = await prisma
        .consultingRecordsConnection({ where: { user: { id: user.id } } })
        .aggregate()
        .count();
      const bookingCount = await prisma
        .bookingRecordsConnection({ where: { user: { id: user.id } } })
        .aggregate()
        .count();
      const billsCount = await prisma
        .billsConnection({ where: { user: { id: user.id } } })
        .aggregate()
        .count();
      const hasBeenHospitalCount = await prisma
        .bookingRecordsConnection({
          where: {
            user: { id: user.id },
            bookingStatus_not: 0
          }
        })
        .aggregate()
        .count();
      ret.push({
        ...user,
        firstAdvisoryWay:
          consultations.length !== 0 ? consultations[0].advisoryWay : "",
        consultationCount,
        bookingCount,
        billsCount,
        hasBeenHospitalCount
      });
    }
    return ret;
  },
  userBasicById: async (parent, args, context) =>
    await prisma.userBasic({ id: args.id }),
  userBasics: async () =>
    await prisma.userBasics({ orderBy: "createdAt_DESC" }),
  consultingRecords: async () =>
    await prisma.consultingRecords({ orderBy: "createdAt_DESC" }),
  bookingRecords: async () =>
    await prisma.bookingRecords({ orderBy: "createdAt_DESC" }),
  dictionaries: async () =>
    await prisma.dictionaries({ orderBy: "createdAt_DESC" }),
  ads: async () => await prisma.ads(),
  adConsumptions: async () =>
    await prisma.adConsumptionRecs({ orderBy: "createdAt_DESC" }),
  consultationWorks: async () =>
    await prisma.consultationWorks({ orderBy: "createdAt_DESC" }),
  admins: async () => await prisma.admins({ orderBy: "createdAt_DESC" }),
  departments: async () =>
    await prisma.departments({ orderBy: "createdAt_DESC" }),
  bills: async () => await prisma.bills({ orderBy: "createdAt_DESC" }),
  billsDetails: async () =>
    await prisma.billDetails({ orderBy: "createdAt_DESC" }),
  billsDetaildsByBillId: async (parent, args, context) =>
    await prisma.billDetails({
      where: { billId: args.id },
      orderBy: "createdAt_DESC"
    }),
  agencies: async () => await prisma.agencies({ orderBy: "createdAt_DESC" }),
  returnVisitTasks: async () =>
    await prisma.returnVisitTasks({ orderBy: "createdAt_DESC" }),
  returnVisitRecords: async () =>
    await prisma.returnVisitRecords({ orderBy: "createdAt_DESC" }),
  payments: async () => await prisma.payments({ orderBy: "createdAt_DESC" }),
  surgeries: async () => await prisma.surgeries({ orderBy: "createdAt_DESC" }),
  treatments: async () =>
    await prisma.treatments({ orderBy: "createdAt_DESC" }),
  todaysConsultationWorks: async (parent, args, context) => {
    const consultingRecords = await prisma.consultingRecords({
      where: {
        AND: [
          {
            createdAt_gt: args.dateFrom
          },
          {
            createdAt_lt: args.dateTo
          },
          {
            creatorId: args.adminId
          }
        ]
      },
      orderBy: "createdAt_DESC"
    });
    const payload = consultingRecords.map(async ele => {
      const isBooking = await prisma.$exists.bookingRecord({
        consultationRecord: { id: ele.id }
      });
      return { ...ele, isBooking };
    });
    const datas = await Promise.all(payload);

    return datas;
  }
};

export default Query;
