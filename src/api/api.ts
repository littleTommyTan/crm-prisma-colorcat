import Axios from 'axios';

export class API {
  constructor() {
    // // 注册 axios 拦截器
    // axios.interceptors.request.use(request => {
    //   if (this._token) {
    //     request.headers.Authorization = this._token;
    //   }
    //   return request;
    // });
    // axios.interceptors.response.use(async response => {
    //   return response;
    // });
  }

  //网易云音乐api
  async getSongListNetEase(songlistID: string): Promise<any> {
    const respone = await Axios.get(
      `https://music.163.com/api/playlist/detail?id=${songlistID}`
    );
    return respone.data;
  }
  //网易云音乐api
  async getSongLyric(songID: string): Promise<any> {
    const respone = await Axios.get(
      `https://music.163.com/api/song/lyric?os=pc&id=${songID}&lv=-1&kv=-1&tv=-1`
    );
    return respone.data;
  }
  //豆瓣正在热映
  async getDoubanInTheater(): Promise<any> {
    const respone = await Axios.get(
      `https://api.douban.com/v2/movie/in_theaters`
    );
    return respone.data;
  }
  //豆瓣电影详情
  async getMovieDetail(id: string): Promise<any> {
    const respone = await Axios.get(`https://api.douban.com/v2/movie/${id}`);
    return respone.data;
  }
}

export const api = new API();
