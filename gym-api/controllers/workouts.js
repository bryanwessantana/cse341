const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// 1. Defina a função primeiro
const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('workouts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const workoutId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('workouts').find({ _id: workoutId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createWorkout = async (req, res) => {
  const workout = {
    exerciseName: req.body.exerciseName,
    muscleGroup: req.body.muscleGroup,
    sets: req.body.sets,
    reps: req.body.reps,
    weight: req.body.weight,
    difficulty: req.body.difficulty,
    restTime: req.body.restTime,
    equipment: req.body.equipment
  };
  const response = await mongodb.getDb().db().collection('workouts').insertOne(workout);
  if (response.acknowledged) {
    res.status(201).json(response.insertedId);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating the workout.');
  }
};

const updateWorkout = async (req, res) => {
  const workoutId = new ObjectId(req.params.id);
  const workout = {
    exerciseName: req.body.exerciseName,
    muscleGroup: req.body.muscleGroup,
    sets: req.body.sets,
    reps: req.body.reps,
    weight: req.body.weight,
    difficulty: req.body.difficulty,
    restTime: req.body.restTime,
    equipment: req.body.equipment
  };
  const response = await mongodb.getDb().db().collection('workouts').replaceOne({ _id: workoutId }, workout);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating the workout.');
  }
};

const deleteWorkout = async (req, res) => {
  const workoutId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('workouts').deleteOne({ _id: workoutId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting the workout.');
  }
};

// 2. Exporte TODAS as funções no final
module.exports = { 
  getAll, 
  getSingle, 
  createWorkout, 
  updateWorkout, 
  deleteWorkout 
};