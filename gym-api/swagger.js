const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Gym Fitness API',
    description: 'API for managing gym workouts and trainers - CSE 341 Project 2',
  },
  host: 'gym-api-3yw4.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);