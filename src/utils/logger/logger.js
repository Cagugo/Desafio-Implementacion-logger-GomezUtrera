const winston = require('winston');
const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'green',
    debug: 'magenta',
  },
};
winston.addColors(customLevelsOptions.colors);

const devLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.combine(winston.format.colorize({ colors: customLevelsOptions.colors }), winston.format.simple(), winston.format.timestamp()),
    }),
  ],
});
const stageLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'http',
      format: winston.format.combine(winston.format.colorize({ colors: customLevelsOptions.colors }), winston.format.simple(), winston.format.timestamp()),
    }),
  ],
});
const prodLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(winston.format.colorize({ colors: customLevelsOptions.colors }), winston.format.simple(), winston.format.timestamp()),
    }),
    new winston.transports.File({
      filename: './errors.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
    }),
  ],
});
module.exports = { devLogger, stageLogger, prodLogger };
