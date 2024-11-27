const pagination = require('../../../helpers/pagination');
const Response = require('../../../helpers/respones');
const Employee = require('../models/Employee'); // Adjust the path as necessary
const EmployeeHoureRate = require('../models/EmployeHoureRate');
const WorkHour = require('../models/WorkHour');

// Create Employee
const createEmployee = async (req, res, next) => {
    try {
        const {
            name, dateOfBirth, inServiceForm, address, city, email, vcaNr, bic, bnsNr,
            hrId, outOfService, postalCode, country, mobile, ibn
        } = req.body;
        const { employeeImage } = req.files || {};

        if (!name || !dateOfBirth || !inServiceForm || !address || !city || !email || !vcaNr || !bic ||
            !bnsNr || !hrId || !outOfService || !postalCode || !country || !mobile || !ibn) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                message: "All fields are required."
            });
        }

        const files = [];
        if (employeeImage && Array.isArray(employeeImage)) {
            employeeImage.forEach((img) => {
                const publicFileUrl = `/images/employees/${img.filename}`;
                files.push({
                    publicFileUrl,
                    path: img.filename,
                });
            });
        }

        const newEmployee = new Employee({
            name,
            dateOfBirth,
            inServiceForm,
            address,
            city,
            employeeImage: files[0],
            email,
            vcaNr,
            bic,
            bnsNr,
            hrId,
            outOfService,
            postalCode,
            country,
            mobile,
            ibn,
        });

        await newEmployee.save();

        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Employee created successfully.",
            data: newEmployee
        });
    } catch (error) {
        next(error);
    }
};

// Get All Employees with optional name query
const getAllEmployees = async (req, res, next) => {
    try {

        // for pagination 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

        const { name } = req.query;

        // Create a filter object, adding a name filter if provided
        const filter = name ? { name: new RegExp(name, 'i') } : {};

        const employeesLength= await Employee.find(filter).countDocuments()

        const employees = await Employee.find(filter)
        .skip((page - 1) * limit)
        .limit(limit);

        const customePagination=pagination(employeesLength,limit,page)
        
        res.status(200).json(Response({
            status: "success",
            statusCode: 200,
            message:"show all user successfully",
            data: employees,
            pagination:customePagination
        }));
    } catch (error) {
        next(error);
    }
};

// Get Employee by ID
const getEmployeeById = async (req, res, next) => {
    try {
        const { id } = req.query;
        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Employee not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            data: employee
        });
    } catch (error) {
        next(error);
    }
};

// Update Employee by ID
const updateEmployee = async (req, res, next) => {
    try {
        const { id } = req.query;
        const {
            name, dateOfBirth, inServiceForm, address, city, email, vcaNr, bic, bnsNr,
            hrId, outOfService, postalCode, country, mobile, ibn
        } = req.body;
        const { employeeImage } = req.files || {};

        const files = [];
        if (employeeImage && Array.isArray(employeeImage)) {
            employeeImage.forEach((img) => {
                const publicFileUrl = `/images/employees/${img.filename}`;
                files.push({
                    publicFileUrl,
                    path: img.filename,
                });
            });
        }

        const updatedEmployeeData = {
            name,
            dateOfBirth,
            inServiceForm,
            address,
            city,
            email,
            vcaNr,
            bic,
            bnsNr,
            hrId,
            outOfService,
            postalCode,
            country,
            mobile,
            ibn,
        };

        if (files[0]) {
            updatedEmployeeData.employeeImage = files[0];
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedEmployeeData, { new: true });

        if (!updatedEmployee) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Employee not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Employee updated successfully.",
            data: updatedEmployee
        });
    } catch (error) {
        next(error);
    }
};

// Delete Employee by ID
const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.query;
        const employee = await Employee.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Employee not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Employee deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};

// Get all project names
const getAllEmployeeNames = async (req, res, next) => {
    try {
        // Fetch only the `projectName` field for each project
        const projects = await Employee.find().select('name');

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Showing all Customer names",
            data: projects
        });
    } catch (error) {
        next(error);
    }
};



const calculateEmployeeEarnings = async (req, res, next) => {
  try {
    const { employeId } = req.query;

    // Fetch employee data
    const employee = await Employee.findById(employeId);
    if (!employee) {
      return res.status(404).json({
        status: "fail",
        statusCode: 404,
        message: "Employee not found.",
      });
    }

    // Fetch work hours for the employee
    const workHours = await WorkHour.findOne({ employeId });
    if (!workHours) {
      return res.status(404).json({
        status: "fail",
        statusCode: 404,
        message: "No work hour data found for the employee.",
      });
    }

    // Fetch hourly rates for the employee
    const hourRate = await EmployeeHoureRate.findOne({ employeId });
    if (!hourRate) {
      return res.status(404).json({
        status: "fail",
        statusCode: 404,
        message: "No hourly rate data found for the employee.",
      });
    }

    let totalEarnings = 0;

    // Iterate through weeks and calculate total hours
    for (const week of workHours.week) {
      for (const day of week.dayName) {
        const hoursWorked = parseFloat(day.hours);
        console.log(hoursWorked);

        if (hoursWorked <= 8) {
          totalEarnings += hoursWorked * parseFloat(hourRate.eightHourRate);
        } else if (hoursWorked > 8 && hoursWorked <= 10) {
          totalEarnings += hoursWorked * parseFloat(hourRate.tenhours);
          console.log(hourRate);
        } else {
          totalEarnings += 8 * parseFloat(hourRate.eightHourRate) + 
                           (hoursWorked - 8) * parseFloat(hourRate.tenHourRate);
        }
      }
    }

    // Save the total earnings to the employee model
    employee.earnTotal = totalEarnings.toFixed(2);
    await employee.save();
console.log(totalEarnings);
    res.status(200).json({
      status: "success",
      statusCode: 200,
      message: "Total earnings calculated successfully.",
      data: {
        employeeId: employee._id,
        totalEarnings: employee.earnTotal,
      },
    });
  } catch (error) {
    next(error);
  }
};




module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getAllEmployeeNames,
    calculateEmployeeEarnings
};
