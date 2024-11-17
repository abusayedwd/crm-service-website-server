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

// Update Employee Payment Controller
// const updateEmployeePayment = async (req, res, next) => {
//     try {
//         const { id } = req.query; // Get the employee ID from query parameters
//         const { paymentAmount, paymentDate, forWhatPayment, paymentAction } = req.body; // Get payment values from request body

//         // Create a new payment record
//         const newPayment = {
//             paymentAmount: paymentAmount || "0", // Set default if not provided
//             paymentDate: paymentDate || new Date(), // Set default to current date if not provided
//             forWhatPayment: forWhatPayment || "", // Set default if not provided
//             paymentAction: paymentAction || "" // Set default if not provided
//         };

//         // Find the employee by ID and update by pushing the new payment record to the paymentHistory array
//         const updatedEmployee = await Employee.findByIdAndUpdate(
//             id,
//             { $push: { paymentHistory: newPayment } }, // Push new payment to paymentHistory array
//             { new: true } // Return the updated document
//         );
//         console.log(updatedEmployee,newPayment);

//         // If no employee found, return an error
//         if (!updatedEmployee) {
//             return res.status(404).json({ status: "error", statusCode: 404, message: "Employee not found" });
//         }

//         // Return the updated employee payment data
//         res.status(200).json({
//             status: "success",
//             statusCode: 200,
//             message: "Employee payment information updated successfully",
//             data: updatedEmployee
//         });
//     } catch (error) {
//         next(error);
//     }
// };

const employeeTotalPayment = async (req, res, next) => {
    try {
        // Fetch all employees
        const employees = await Employee.find();

        // Calculate the total payment amount
        const totalPaymentAmount = employees.reduce((total, employee) => {
            return total + parseFloat(employee.paymentAmount || "0");
        }, 0);

        // Respond with the total payment amount
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Total payment amount calculated successfully",
            data: {
                totalPaymentAmount: totalPaymentAmount.toFixed(2) // Ensure it's a formatted number
            }
        });
    } catch (error) {
        next(error); // Pass errors to the error handler
    }
};
module.exports = { updateEmployeeHourlyRate,updateEmployeePayment,employeeTotalPayment };
