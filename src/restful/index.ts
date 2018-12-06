import { api } from '../api/api';

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.get("/songLrc", async (req, res) => {
  var reqData = req.query || req.params;
  if (!reqData.songId) res.json({ code: -1, msg: "请求参数有误" });

  const data = await api.getSongLyric(reqData.songId);

  if (data.lrc) {
    res.json(data.lrc.lyric);
  } else {
    res.json("[00:00.000]未找到歌词");
  }
});

app.listen(4001, () =>
  console.log("Restful Server is running on http://localhost:4001")
);
