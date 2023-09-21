class LoggerController {
  getLogger = async (req, res) => {
    try {
      req.logger.fatal('¡Alerta!');
      req.logger.error('¡Alerta!');
      req.logger.warn('¡Alerta!');
      req.logger.info('¡Alerta!');
      req.logger.http('¡Alerta!');
      req.logger.debug('¡Alerta!');
      res.send({ message: '¡Test de loggers!' });
    } catch (error) {
      return res.sendServerError('Ha ocurrido un error');
    }
  };
}
module.exports = new LoggerController();
