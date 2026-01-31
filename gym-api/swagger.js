const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Gym Fitness API',
    description: 'Gym Fitness API with Auth0 OAuth2 Protection',
  },
  host: 'gym-api-3yw4.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    auth0: {
      type: 'oauth2',
      authorizationUrl: 'https://dev-mhixwsirvszzkqmy.us.auth0.com/authorize',
      flow: 'implicit',
      scopes: {
        openid: 'OpenID access',
        profile: 'Profile access',
        email: 'Email access'
      }
    }
  },
  security: [
    {
      auth0: ['openid', 'profile', 'email']
    }
  ]
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);