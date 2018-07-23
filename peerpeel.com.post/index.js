const seneca = require("seneca")();

seneca.use(require('./actions'));

//correr por socket
seneca.listen({port: 5000, type: "tcp", pin:"role:Post"});