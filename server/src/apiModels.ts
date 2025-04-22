import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI!, {
    // options for the connect method to parse the URI
    // useNewUrlParse: true,
    // useUnifiedTopology: true,

    // sets the name of the DB that our collections are part of
    dbName: 'doo',
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

module.exports;
