module.exports= {
    documentationPath: '/',
    basePath: '/api/',
    info: {
      title: 'Wolfy Api',
      description: 'microservices peerpeel API',
      version: '1.0.0',
      contact: {
        name: 'Daniel Eslava',
        email: 'danieleslava52@gmail.com'
      }
    },
    securityDefinitions: {
      'jwt': {
        'type': 'apiKey',
        'name': 'Authorization',
        'in': 'header'
      }
    },
    grouping: 'tags',
    sortEndpoints: 'ordered'
  }