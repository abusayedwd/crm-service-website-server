const pagination = require('../../../helpers/pagination');
const HourlyRate = require('../models/HourlyRate'); // Adjust path as needed

// Create a new hourly rate
const createHourlyRate = async (req, res) => {
  try {
    const { name, eighHours, tenHours, func } = req.body;

    if (!name || !eighHours || !tenHours || !func) {
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        message: "All fields are required."
      });
    }

    const hourlyRate = new HourlyRate({
      name,
      eighHours,
      tenHours,
      function: func,
    });

    await hourlyRate.save();
    res.status(201).json({
      status: "success",
      statusCode: 201,
      message: "Hourly rate created successfully.",
      data: hourlyRate
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Failed to create hourly rate",
      error
    });
  }
};

// Get hourly rate by ID
const getHourlyRateById = async (req, res) => {
  try {
    const { id } = req.query;

    const hourlyRate = await HourlyRate.findById(id);
    if (!hourlyRate) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Hourly rate not found."
      });
    }

    res.status(200).json({
      status: "success",
      statusCode: 200,
      data: hourlyRate
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Failed to retrieve hourly rate",
      error
    });
  }
};

// Get all hourly rates
const getAllHourlyRates = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const hourlyRatesLentgh = await HourlyRate.find().countDocuments()
    const hourlyRates = await HourlyRate.find()

    const paginationOfPost= pagination(hourlyRatesLentgh,limit,page)


    res.status(200).json({
      status: "success",
      statusCode: 200,
      data: hourlyRates,
      pagination:paginationOfPost
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Failed to retrieve hourly rates",
      error
    });
  }
};

// Update hourly rate by ID
const updateHourlyRate = async (req, res) => {
  try {
    const { id } = req.query;
    const { name, eighHours, tenHours, func } = req.body;

    const updatedHourlyRate = await HourlyRate.findByIdAndUpdate(
      id,
      { name, eighHours, tenHours, function: func },
      { new: true }
    );

    if (!updatedHourlyRate) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Hourly rate not found."
      });
    }

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Hourly rate updated successfully.",
      data: updatedHourlyRate
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Failed to update hourly rate",
      error
    });
  }
};

// Delete hourly rate by ID
const deleteHourlyRate = async (req, res) => {
  try {
    const { id } = req.query;

    const deletedHourlyRate = await HourlyRate.findByIdAndDelete(id);
    if (!deletedHourlyRate) {
      return res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Hourly rate not found."
      });
    }

    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Hourly rate deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Failed to delete hourly rate",
      error
    });
  }
};

module.exports = {
  createHourlyRate,
  getHourlyRateById,
  getAllHourlyRates,
  updateHourlyRate,
  deleteHourlyRate
};
