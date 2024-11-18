const RevaluePayment = require('../models/RevaluePayment');

// Create a new payment revalue record
const createRevaluePayment = async (req, res,next) => {
  try {
    const { startDate, completedData, type, referance, orignalAmount } = req.body;

    const newRevaluePayment = new RevaluePayment({
      startDate,
      completedData,
      type,
      referance,
      orignalAmount,
    });

    const savedRevaluePayment = await newRevaluePayment.save();
    res.status(201).json({ message: 'Revalue Payment created successfully', data: savedRevaluePayment });
  } catch (error) {
next(error)  }
};

// Get all payment revalue records
const getAllRevaluePayments = async (req, res,next) => {
  try {
    const revaluePayments = await RevaluePayment.find();
    res.status(200).json({ message: 'All Revalue Payments retrieved successfully', data: revaluePayments });
  } catch (error) {
next(error)  }
};

// Get a payment revalue record by ID
const getRevaluePaymentById = async (req, res,next) => {
  try {
    const { id } = req.params;
    const revaluePayment = await RevaluePayment.findById(id);

    if (!revaluePayment) {
      return res.status(404).json({ error: 'Revalue Payment not found' });
    }

    res.status(200).json({ message: 'Revalue Payment retrieved successfully', data: revaluePayment });
  } catch (error) {
next(error)  }
};

// Update a payment revalue record by ID
const updateRevaluePayment = async (req, res,next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedRevaluePayment = await RevaluePayment.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedRevaluePayment) {
      return res.status(404).json({ error: 'Revalue Payment not found' });
    }

    res.status(200).json({ message: 'Revalue Payment updated successfully', data: updatedRevaluePayment });
  } catch (error) {
next(error)  }
};

// Delete a payment revalue record by ID
const deleteRevaluePayment = async (req, res,next) => {
  try {
    const { id } = req.params;

    const deletedRevaluePayment = await RevaluePayment.findByIdAndDelete(id);

    if (!deletedRevaluePayment) {
      return res.status(404).json({ error: 'Revalue Payment not found' });
    }

    res.status(200).json({ message: 'Revalue Payment deleted successfully' });
  } catch (error) {
next(error)  }
};


module.exports={
    createRevaluePayment,
    getAllRevaluePayments,
    getRevaluePaymentById,
    updateRevaluePayment,
    deleteRevaluePayment
}