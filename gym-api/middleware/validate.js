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

const saveTrainer = (req, res, next) => {
  const { firstName, lastName, email, specialty } = req.body;

  if (!firstName || !lastName || !email || !specialty) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: All fields (firstName, lastName, email, specialty) are required.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed: Invalid email format.'
    });
  }

  next();
};

module.exports = { 
  saveWorkout,
  saveTrainer 
};