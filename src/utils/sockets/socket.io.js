const { Server: SocketIO } = require('socket.io');

class SocketConfig {
  static instancia = undefined;

  constructor(server) {
    if (SocketConfig.instancia) {
      return SocketConfig.instancia;
    }
    SocketConfig.instancia = this;
    this.io = new SocketIO(server);
    this.mensajes = [];
    this.init();
  }
  init() {
    try {
      this.io.on('connection', (socket) => {
        this.io.sockets.emit('init', this.mensajes);
        socket.on('mensaje', (data) => {
          this.mensajes.push({ ...data });
          this.io.sockets.emit('nuevomensaje', this.mensajes);
        });
        socket.on('newProduct', (product) => {
          this.io.emit('newProduct', product);
        });
        socket.on('updateProduct', (product) => {
          this.io.emit('updateProduct', product);
        });
        socket.on('deleteProduct', (productId) => {
          this.io.emit('deleteProduct', productId);
        });
        socket.on('disconnect', () => {
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = SocketConfig;
