import express from 'express';
import {OneComment, OneCommentWithoutId, OneNewsWithoutId} from "../types";
import mysqlDb from "../mysqlDB";
import {OkPacket} from "mysql2";
import {imagesUpload} from "../multer";

const newsRouter = express.Router();

newsRouter.get('', async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query('SELECT * FROM comments');
  const comments = result[0] as OneComment[];

  res.send(comments);
});

newsRouter.get('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();
  const result = await connection.query(
    'SELECT * FROM comments WHERE id = ?',
    [req.params.id]
  );
  const comments = result[0] as OneComment[];
  const oneComment = comments[0];

  if (!oneComment) {
    return res.status(404).send({error: 'Not Found'});
  }

  res.send(oneComment);
});

newsRouter.post('', async (req, res) => {
  if (!req.body.news_id) {
    return res.status(400).send({error: 'Поле "news_id" отсутствует'});
  }

  if (!req.body.message) {
    return res.status(400).send({error: 'Поле "message" отсутствует'});
  }

  const oneCommentData: OneCommentWithoutId = {
    news_id: req.body.news_id,
    message: req.body.message,
    author: req.body.author ?? null,
  };

  const connection = mysqlDb.getConnection();

  const sql = connection.format(
    'INSERT INTO comments (news_id, message, author) VALUES (?, ?, ?)',
    [oneCommentData.news_id, oneCommentData.message, oneCommentData.author]
  );

  try {
    const result = await connection.query(sql);
    const info = result[0] as OkPacket;

    res.send({
      ...oneCommentData,
      id: info.insertId,
    });
  } catch (e) {
    return res.status(500).send({error: 'Не удалось добавить комментарий'});
  }
});

newsRouter.delete('/:id', async (req, res) => {
  const connection = mysqlDb.getConnection();

  const result = await connection.query(
      'SELECT * FROM comments WHERE id = ?',
      [req.params.id]
  );
  const comments = result[0] as OneComment[];
  const oneComment = comments[0];

  if (!oneComment) {
    return res.status(404).send({error: 'Not Found'});
  }

  await connection.query('DELETE FROM comments WHERE id = ?', req.params.id);

  res.send("Deleted");
});


export default newsRouter;
