const seneca = require("seneca")();

seneca.use(require('./actions'));

//correr por socket
seneca.listen({port: 1111, type: "tcp", pin:"role:Categories"});