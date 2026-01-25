const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().db().collection('trainers').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const trainerId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('trainers').find({ _id: trainerId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createTrainer = async (req, res) => {
  const trainer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    specialty: req.body.specialty,
    certification: req.body.certification
  };
  const response = await mongodb.getDb().db().collection('trainers').insertOne(trainer);
  if (response.acknowledged) {
    res.status(201).json(response.insertedId);
  } else {
    res.status(500).json(response.error || 'Error occurred while creating the trainer.');
  }
};

const updateTrainer = async (req, res) => {
  const trainerId = new ObjectId(req.params.id);
  const trainer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    specialty: req.body.specialty,
    certification: req.body.certification
  };
  const response = await mongodb.getDb().db().collection('trainers').replaceOne({ _id: trainerId }, trainer);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while updating the trainer.');
  }
};

const deleteTrainer = async (req, res) => {
  const trainerId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('trainers').deleteOne({ _id: trainerId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Error occurred while deleting the trainer.');
  }
};

module.exports = { 
  getAll, 
  getSingle, 
  createTrainer, 
  updateTrainer, 
  deleteTrainer 
};