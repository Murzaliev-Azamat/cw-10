import express from 'express';
import {existCategoryID, OneNews, OneNewsWithoutId} from "../types";
import mysqlDb from "../mysqlDB";
import {OkPacket} from "mysql2";
import {imagesUpload} from "../multer";

const newsRouter = express.Router();

newsRouter.get('', async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query('SELECT id, title, image FROM news');
  const news = result[0] as OneNews[];

  res.send(news);
});

newsRouter.get('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query(
    'SELECT * FROM news WHERE id = ?',
    [req.params.id]
  );
  const news = result[0] as OneNews[];
  const oneNews = news[0];

  if (!oneNews) {
    return res.status(404).send({error: 'Not Found'});
  }

  res.send(oneNews);
});

newsRouter.post('',imagesUpload.single('image'), async (req, res) => {
  if (!req.body.title || !req.body.info) {
    return res.status(400).send({error: 'Поле сообщение отсутствует'});
  }

  const oneNewsData: OneNewsWithoutId = {
    title: req.body.title,
    info: req.body.info,
    image: req.file ? req.file.filename : null,
  };

  const connection = mysqlDb.getConnection();

  const sql = connection.format(
    'INSERT INTO news (title, info, image) VALUES (?, ?, ?)',
    [oneNewsData.title, oneNewsData.info, oneNewsData.image]
  );

  const result = await connection.query(sql);

  const info = result[0] as OkPacket;

  res.send({
    ...oneNewsData,
    id: info.insertId,
  });
});

newsRouter.delete('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();

  // const resultoneNewsIdsInItems = await connection.query('SELECT category_id FROM items');
  // const oneNewsIdsInItems = resultoneNewsIdsInItems[0] as existCategoryID[];
  // for (const oneNewsIdInItems of oneNewsIdsInItems) {
  //   const everyID = oneNewsIdInItems.category_id;
  //   if (everyID === Number(req.params.id)) {
  //     res.send("Данную категорию нельзя удалить, так как она связана с ресурсом item");
  //     return
  //   }
  // }

  await connection.query('DELETE FROM news WHERE id = ?', req.params.id);

  res.send("Deleted");
});


export default newsRouter;
