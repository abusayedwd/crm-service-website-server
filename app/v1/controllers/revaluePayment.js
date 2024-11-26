const RevaluePayment = require("../models/RevaluePayemnt");


// Create a new payment revalue record
const createRevaluePayment = async (req, res,next) => {
    try {
      const { startDate, completedData, type, referance, orignalAmount } = req.body;
      const { bankrefPicture } = req.files || {};
      const files = [];

      // Check if there are uploaded files
      if (bankrefPicture && Array.isArray(bankrefPicture)) {
        bankrefPicture.forEach((img) => {
              const publicFileUrl = `/images/users/${img.filename}`;
              files.push({
                  publicFileUrl,
                  path: img.filename,
              });
          });
      }
  
      const newRevaluePayment = new RevaluePayment({
        startDate,
        completedData,
        type,
        referance,
        bankrefPicture:files[0],
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
    const { id } = req.query;
    const revaluePayment = await RevaluePayment.findById(id);

    if (!revaluePayment) {
      return res.status(404).json({ error: 'Revalue Payment not found' });
    }

    res.status(200).json({ message: 'Revalue Payment retrieved successfully', data: revaluePayment });
  } catch (error) {
next(error)  }
};

// Update a payment revalue record by ID
// const updateRevaluePayment = async (req, res,next) => {
//   try {
//     const { id } = req.query;
//     const updates = req.body;

//     const { bankrefPicture } = req.files || {};
//     const files = [];

//     // Check if there are uploaded files
//     if (bankrefPicture && Array.isArray(bankrefPicture)) {
//       bankrefPicture.forEach((img) => {
//             const publicFileUrl = `/images/users/${img.filename}`;
//             files.push({
//                 publicFileUrl,
//                 path: img.filename,
//             });
//         });
//     }

//     const updatedRevaluePayment = await RevaluePayment.findByIdAndUpdate(id, updates, { new: true });

//     if (!updatedRevaluePayment) {
//       return res.status(404).json({ error: 'Revalue Payment not found' });
//     }

//     res.status(200).json({ message: 'Revalue Payment updated successfully', data: updatedRevaluePayment });
//   } catch (error) {
// next(error)  }
// };
// Update a payment revalue record by ID
const updateRevaluePayment = async (req, res, next) => {
  try {
      const { id } = req.query;
      const updates = req.body;

      const { bankrefPicture } = req.files || {};
      const files = [];

      // Check if there are uploaded files
      if (bankrefPicture && Array.isArray(bankrefPicture)) {
          bankrefPicture.forEach((img) => {
              const publicFileUrl = `/images/users/${img.filename}`;
              files.push({
                  publicFileUrl,
                  path: img.filename,
              });
          });

          // Add the first file to updates if there are uploaded files
          if (files.length > 0) {
              updates.bankrefPicture = files[0];
          }
      }

      // Find and update the revalue payment record
      const updatedRevaluePayment = await RevaluePayment.findByIdAndUpdate(id, updates, { new: true });

      // Check if the record was found
      if (!updatedRevaluePayment) {
          return res.status(404).json({ error: 'Revalue Payment not found' });
      }

      // Respond with success
      res.status(200).json({
          message: 'Revalue Payment updated successfully',
          data: updatedRevaluePayment,
      });
  } catch (error) {
      next(error); // Pass error to the global error handler
  }
};


// Delete a payment revalue record by ID
const deleteRevaluePayment = async (req, res,next) => {
  try {
    const { id } = req.query;

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