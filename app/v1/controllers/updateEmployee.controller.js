const Response = require("../../../helpers/respones");
const Employee = require("../models/Employee");


// employee updated  controller 

// Update Employee Hourly Rate Controller
const updateEmployeeHourlyRate = async (req, res,next) => {
    try {
        const { id } = req.query; // Get the employee ID from request parameters
        const { eightHourRate, tenHourRate, function: employeeFunction } = req.body; // Get update values from request body

        // Find the employee by ID and update the hourly rate fields
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                eightHourRate: eightHourRate || "20", // Update or keep default
                tenHourRate: tenHourRate || "30", // Update or keep default
                function: employeeFunction || "employee", // Update or keep default
            },
            { new: true } // Return the updated document
        );

        // If no employee found, return an error
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Return the updated employee data
        res.status(200).json(Response({status:"success",statusCode:200, message: "Employee hourly rate updated successfully", data: updatedEmployee }));
    } catch (error) {
        next(error)
    }
};


// employee payment controller 

// Update Employee Payment Controller
const updateEmployeePayment = async (req, res, next) => {
    try {
        const { id } = req.query; // Get the employee ID from query parameters
        const { paymentAmount, paymentDate, forWhatPayment, paymentAction } = req.body; // Get payment values from request body

        // Find the employee by ID and update payment fields
        const updatedEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                paymentAmount: paymentAmount || "0", // Update or keep default
                paymentDate: paymentDate || null, // Update or keep null if not provided
                forWhatPayment: forWhatPayment || "", // Update or keep empty if not provided
                paymentAction: paymentAction || "" // Update or keep empty if not provided
            },
            { new: true } // Return the updated document
        );

        // If no employee found, return an error
        if (!updatedEmployee) {
            return res.status(404).json({ status: "error", statusCode: 404, message: "Employee not found" });
        }

        // Return the updated employee payment data
        res.status(200).json(Response({
            status: "success",
            statusCode: 200,
            message: "Employee payment information updated successfully",
            data: updatedEmployee
        }));
    } catch (error) {
        next(error);
    }
};

module.exports = { updateEmployeeHourlyRate,updateEmployeePayment };
