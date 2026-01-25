const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Gym Fitness API',
    description: 'API for managing gym workouts and trainers - CSE 341 Project 2',
  },
  host: 'localhost:8080',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);