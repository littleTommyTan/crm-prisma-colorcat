import updateDoubanIntheater from './DoubanInTheater';

export default async function scheduleDataFetch() {
  try {
    await Promise.all([updateDoubanIntheater()]);
  } catch (error) {
    throw error;
  }
  //十分钟一跳类型
  setInterval(() => {
    updateDoubanIntheater();
  }, 1000 * 60 * 10);
}
