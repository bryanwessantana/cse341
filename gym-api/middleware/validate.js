const saveWorkout = (req, res, next) => {
  const { exerciseName, sets, reps } = req.body;
  
  if (!exerciseName || !sets || !reps) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: exerciseName, sets, and reps are required fields.'
    });
  }
  
  if (typeof sets !== 'number' || sets <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: sets must be a positive number.'
    });
  }

  next();
};

module.exports = { saveWorkout };