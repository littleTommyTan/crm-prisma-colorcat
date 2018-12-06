import { api } from '../api/api';

const Query = {
  playlist: async (parent, args, context) => {
    //网易云音乐api
    const data = await api.getSongListNetEase(args.songListId);
    console.log(typeof data.result);

    if (typeof data.result === undefined) return { error: "找不到songlist" };
    const playList = data.result.tracks.map(async item => {
      const data = await api.getSongLyric(item.id);
      if (typeof data.lrc.lyric === undefined) return { error: "找不到lrc" };
      return {
        id: item.id,
        name: item.name,
        artist: item.artists.map(el => el.name).join(","),
        url: `https://music.163.com/song/media/outer/url?id=${item.id}.mp3`,
        cover: item.album.picUrl.replace(/http:/, "https:"),
        lrc: data.lrc.lyric
      };
    });
    return playList;
  },
  doubanIntheater: (parent, args, context) => context.prisma.movies()

  // feed: (parent, args, ctx) => ctx.db.posts({ where: { published: true } }),
  // drafts: (parent, args, ctx) => ctx.db.posts({ where: { published: false } }),
  // post: (parent, { id }, ctx) => ctx.db.post({ id })
};
export default Query;
