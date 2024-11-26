const Employee = require("../models/Employee");
const EmployeeHoureRate = require("../models/EmployeHoureRate");



// const createEmployeeHourRate = async (req, res, next) => {
//   try {
//     const { employeId, projectId, week } = req.body;

//     const newRate = new EmployeeHoureRate({
//       employeId,
//       projectId,
//       week,
//     });

//     const savedRate = await newRate.save();

//     res.status(201).json({
//       status: "success",
//       statusCode: 201,
//       message: "Employee hour rate created successfully.",
//       data: savedRate,
//     });
//   } catch (error) {
//     next(error);
//   }
// };


const createEmployeeHourRate = async (req, res, next) => {
    try {
      const { employeId, projectId, week } = req.body;
  
      // Check if the employee exists
      const employeeExists = await Employee.findById(employeId);
      if (!employeeExists) {
        return res.status(404).json({
          status: "fail",
          statusCode: 404,
          message: "Employee not found. Please provide a valid employeId.",
        });
      }
  
      // Check if an EmployeeHourRate already exists for this employeId
      const existingRate = await EmployeeHoureRate.findOne({ employeId });
  
      if (existingRate) {
        return res.status(400).json({
          status: "fail",
          statusCode: 400,
          message: "Employee hour rate already exists. You cannot create it again.",
          
        });
      }
  
      // Create a new EmployeeHourRate if none exists
      const newRate = new EmployeeHoureRate({
        employeId,
        projectId,
        week,
      });
  
      const savedRate = await newRate.save();
  
      res.status(201).json({
        status: "success",
        statusCode: 201,
        message: "Employee hour rate created successfully.",
        data: savedRate,
      });
    } catch (error) {
      next(error);
    }
  };
  

    const updateEmployeeHourRate = async (req, res, next) => {
        try {
          const { id } = req.query; // Employee hour rate ID
          const { weekName, dayName, eighthours, tenhours } = req.body;
      
          if (!weekName || !dayName || eighthours === undefined || tenhours === undefined) {
            return res.status(400).json({
              status: "error",
              statusCode: 400,
              message: "Missing required fields: weekName, dayName, eighthours, or tenhours",
            });
          }
      
          // Find the EmployeeHourRate entry by ID
          let hourRateEntry = await EmployeeHoureRate.findById(id);
      
          if (!hourRateEntry) {
            return res.status(404).json({
              status: "error",
              statusCode: 404,
              message: "Employee hour rate entry not found.",
            });
          }
      
          // Check if the week already exists
          let week = hourRateEntry.week.find((w) => w.weekName === weekName);
      
          if (!week) {
            // If the week does not exist, create a new week with the provided day and hours
            hourRateEntry.week.push({
              weekName,
              dayName: [{ dayName, eighthours, tenhours }],
            });
          } else {
            // Find the specific day within the week
            let day = week.dayName.find((d) => d.dayName === dayName);
      
            if (day) {
              // Update hours for the existing day
              day.eighthours = eighthours;
              day.tenhours = tenhours;
            } else {
              // Add a new day to the existing week
              week.dayName.push({ dayName, eighthours, tenhours });
            }
          }
      
          // Save the updated entry
          const updatedHourRate = await hourRateEntry.save();
      
          res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Employee hour rate updated successfully.",
            data: updatedHourRate,
          });
        } catch (error) {
          next(error);
        }
      };
      

  // get 
  const getAllEmployeeHourRates = async (req, res, next) => {
    try {
      const hourRates = await EmployeeHoureRate.find()
        .populate('employeId', 'name') // Populate employee data (e.g., name)
        .populate('projectId', 'title'); // Populate project data (e.g., title)
  
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "All employee hour rates retrieved successfully.",
        data: hourRates,
      });
    } catch (error) {
      next(error);
    }
  };

  // get by id

  const getEmployeeHourRateById = async (req, res, next) => {
    try {
      const { id } = req.query;
  
      const hourRate = await EmployeeHoureRate.findById(id)
        .populate('employeId', 'name') // Populate employee data (e.g., name)
        .populate('projectId', 'title'); // Populate project data (e.g., title)
  
      if (!hourRate) {
        return res.status(404).json({
          status: "fail",
          statusCode: 404,
          message: "Employee hour rate not found.",
        });
      }
  
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Employee hour rate retrieved successfully.",
        data: hourRate,
      });
    } catch (error) {
      next(error);
    }
  };


  const getAllEmployeNamesNotInHourlyRate = async (req, res, next) => {
    try {
      // Fetch all employee IDs that already have an hourly rate
      const employeesWithRates = await EmployeeHoureRate.find().select('employeId');
      const employeeIdsWithRates = employeesWithRates.map((rate) => rate.employeId.toString());
  
      // Fetch employees not in the above list
      const employeesWithoutRates = await Employee.find({
        _id: { $nin: employeeIdsWithRates }, // Exclude those in the hourly rate list
      }).select('name');
  
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Showing all employees not added to hourly rate.",
        data: employeesWithoutRates,
      });
    } catch (error) {
      next(error);
    }
  };

  
  module.exports={
    createEmployeeHourRate,
    updateEmployeeHourRate,
    getAllEmployeeHourRates,
    getEmployeeHourRateById,
    getAllEmployeNamesNotInHourlyRate
  }
  