import cors from 'cors';
import express from 'express';
import newsRouter from "./routers/news";
import commentRouter from "./routers/comments";
import mysqlDb from "./mysqlDB";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/news', newsRouter);
app.use('/comments', commentRouter);

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
};

run().catch(console.error);
