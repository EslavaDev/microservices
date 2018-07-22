const seneca = require("seneca")();

seneca.use(require('./actions'));

//correr por socket
seneca.listen({port: 4000, type: "tcp", pin:"role:Urgentes"})

/*var handlerSum = (msg, reply) => {
    let test = msg.payload;
    var resultado = (parseInt(test.a) + parseInt(test.b));
    reply(null, {
        r: resultado
    });
};
seneca.add('role:Act, cmd: sum', handlerSum);

var handlerSub = (msg, reply) => {
    var resultado = (msg.a - msg.b);
    reply(null, {
        r: resultado
    });
};
seneca.add('role:Act, cmd: sub', handlerSub);*/
