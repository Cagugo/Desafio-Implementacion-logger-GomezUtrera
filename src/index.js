const express = require('express');
const cors = require('cors');
const path = require('path');
const expressHandlebars = require('express-handlebars');
const SocketConfig = require('./utils/sockets/socket.io');
const { config } = require('./config');
const { db } = require('./config');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const PORT = `${config.port}` || 3001;
const passport = require('passport');
const initializePassport = require('./config/passport');
const Dao = require('./dao/factory');
const { generateFakeProducts } = require('./scripts/generateFakerProducts');
const ErrorHandler = require('./utils/errors/index');
const loggerMiddleware = require('./utils/logger/loggerMiddleware');
const req = {};
loggerMiddleware(req, null, () => {});

class Server {
  constructor() {
    this.app = express();
    this.settings();
    this.middlewares();
    this.routes();
    this.views();
    this.socket();
  }
  settings() {
    this.app.use(express.json());
    this.app.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.app.use(express.static(path.join(__dirname, '/public')));
  }
  routes() {
    routes(this.app);
  }
  views() {
    const handlebars = expressHandlebars.create({
      defaultLayout: 'main',
    });
    this.app.set('views', path.join(__dirname, 'views'));
    this.app.engine('handlebars', handlebars.engine);
    this.app.set('view engine', 'handlebars');
  }
  middlewares() {
    this.app.use(cors('*'));
    this.app.use(cookieParser(`${config.cookie_key}`));
    this.app.use(
      session({
        store: MongoStore.create({
          mongoUrl: `${db.mongo_atlas}${db.dbName}`,
          mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
          ttl: 1800,
        }),
        secret: config.secret_key,
        resave: true,
        saveUninitialized: true,
      })
    );
    initializePassport();
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    this.app.use(ErrorHandler);
    this.app.use(loggerMiddleware);
  }
  socket() {
    const server = require('http').createServer(this.app);
    const socketConfig = new SocketConfig(server);
    this.app.io = socketConfig.io;
  }
  listen() {
    const server = this.app.listen(PORT, () => {
      req.logger.info(`Servidor en ejecución en http://localhost:${PORT}`);
      generateFakeProducts();
    });
    this.app.io.attach(server);
  }
}
module.exports = new Server();
