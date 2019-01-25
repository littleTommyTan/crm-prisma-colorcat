import Bill from './Bill';
import BookingRecord from './BookingRecord';
import ConsultingRecord from './ConsultingRecord';
import Mutation from './Mutation';
import Payment from './Payment';
import Query from './Query';
import Surgery from './Surgery';
import Treatment from './Treatment';

const resolvers = {
  Query,
  Mutation,
  ConsultingRecord,
  BookingRecord,
  Bill,
  Payment,
  Treatment,
  Surgery
};

export default resolvers;
