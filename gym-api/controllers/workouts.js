const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('workouts').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    const workoutId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('workouts').find({ _id: workoutId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createWorkout = async (req, res) => {
  try {
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
      res.status(500).json('Error occurred while creating the workout.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateWorkout = async (req, res) => {
  try {
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
      res.status(500).json('Error occurred while updating the workout.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const workoutId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('workouts').deleteOne({ _id: workoutId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json('Error occurred while deleting the workout.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createWorkout, updateWorkout, deleteWorkout };