const session = require("express-session");
const MongoStore = require("connect-mongo");

const sessionConfig = session({
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://orlocdiaz:3121@maincluster.pmms0fs.mongodb.net/?retryWrites=true&w=majority`,
    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
    ttl: 20,
  }),
  secret: "S3cr3t",
  resave: false,
  saveUninitialized: false,
});

module.exports = sessionConfig;
