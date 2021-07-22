const express = require("express");
const cors = require("cors")
const app = express();
const config = require("./configs/config");
const imageRouter= require('./routers/image_router');
const categoryRouter = require('./routers/category_router')
const libraryRouter = require('./routers/library_router')


app.use(cors());

app.use(express.json({limit:'50mb'}));

app.use(imageRouter);

app.use(categoryRouter);

app.use(libraryRouter);

app.listen(config.PORT, async () => {
    console.log(`Server up in port ${config.PORT}`);
  });