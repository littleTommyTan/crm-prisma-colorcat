import { prisma } from '../../generated/prisma-client';
import { api } from '../api/api';

const updateDoubanIntheater = async () => {
  const data = await api.getDoubanInTheater();
  if (data.error) return;
  await prisma.deleteManyMovies();
  console.log("movies deleted");

  for (const item of data.subjects) {
    const detail = await api.getMovieDetail(item.id);
    const movie = await prisma.createMovie({
      title: item.title,
      movieId: item.id,
      numRaters: detail.rating.numRaters.toString(),
      rating: item.rating.average.toString(),
      genres: { set: item.genres },
      summary: detail.summary,
      image: item.images.medium,
      detailLink: detail.mobile_link
    });
    console.log(`movie created:${movie}`);
  }
  console.log(`DoubanIntheater updated ${new Date()}`);
  return;
};
export default updateDoubanIntheater;
