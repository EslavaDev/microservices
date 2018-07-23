const seneca = require("seneca")();

seneca.use(require('./actions'));

//correr por socket
seneca.listen({port: 4000, type: "tcp", pin:"role:Urgentes"});