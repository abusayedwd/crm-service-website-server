const Response = require('../../../helpers/respones');
const Cost = require('../models/Cost');
const Customer = require('../models/Customer');
const Employee = require('../models/Employee');
const InvoiceProject = require('../models/InvoiceProject');
const ProjectList = require('../models/ProjectList');
const RevaluePayment = require('../models/RevaluePayemnt');


// Create a new cost entry
// const createCost = async (req, res, next) => {
//     try {
//         const { projectId, costType, year, month, week } = req.body;

//         const newCost = new Cost({
//             projectId,
//             costType,
//             year,
//             month,
//             week  // expecting week to be an array of objects with weekName and amount
//         });

//         const savedCost = await newCost.save();
//         res.status(200).json(Response({ status: "success", statusCode: 200, message: "Cost created successfully", data: savedCost }));
//     } catch (error) {
//         next(error);
//     }
// }

// Create or update a cost entry
const createCost = async (req, res, next) => {
    try {
        const { projectId, costType, month, week } = req.body;

        // Find an existing cost entry for the given project, costType, year, and month
        let costEntry = await Cost.findOne({ projectId, costType, month });
        console.log(costEntry,projectId);

        if (costEntry) {
            // If entry exists, update it by adding new week entries to the week array
            week.forEach(newWeek => {
                const existingWeek = costEntry.week.find(w => w.weekName === newWeek.weekName);
              

                if (existingWeek) {
                    // Update the amount if the week already exists
                    existingWeek.amount = newWeek.amount;
                } else {
                    // Otherwise, push the new week object into the array
                    costEntry.week.push(newWeek);
                }
            });

            const updatedCost = await costEntry.save();
            res.status(200).json(Response({ status: "success", statusCode: 200, message: "Cost updated successfully", data: updatedCost }));
        } else {
            // If no entry exists, create a new one
            const newCost = new Cost({
                projectId,
                costType,
               
                month,
                week
            });

            const savedCost = await newCost.save();
            res.status(200).json(Response({ status: "success", statusCode: 200, message: "Cost created successfully", data: savedCost }));
        }
    } catch (error) {
        next(error);
    }
};


// Get all costs with optional filtering by year, month, and weekName


const getAllCosts = async (req, res, next) => {
    try {
        const { projectId, year, month } = req.query;
        let filter = { projectId: projectId };

        if (month) filter.month = month;

        // Filter by year based on createdAt timestamp
        if (year) {
            filter.$expr = { $eq: [{ $year: "$createdAt" }, parseInt(year)] };
        }

        const costs = await Cost.find(filter);
        console.log(filter,costs);
        res.status(200).json(Response({
            status: "success",
            statusCode: 200,
            message: "Costs retrieved successfully",
            data: costs
        }));
    } catch (error) {
        next(error);
    }
};

// Get a specific cost entry by ID
const getCostById = async (req, res, next) => {
    try {
        const { id } = req.query;

        const cost = await Cost.findById(id);
        if (!cost) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Cost not found"
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Cost retrieved successfully",
            data: cost
        });
    } catch (error) {
        next(error);
    }
};

const totalCost = async (req, res, next) => {
    try {
      // Retrieve all Cost documents
      const costs = await Cost.find();
  
      console.log(costs,"sdkfjklskdjfklsdj");
      // Calculate the total amount
      const totalAmount = costs.reduce((total, cost) => {
        // Sum up amounts in the week array for each document
        const weekTotal = cost.week.reduce((sum, week) => sum + parseFloat(week.amount || 0), 0);
        return total + weekTotal;
      }, 0);
  
      // Respond with the total amount
      res.status(200).json({ status:"success",message:"show successfully",statusCode:200,data:{totalAmount} });
    } catch (error) {
      next(error);
    }
  };

  const totalRevinew = async (req, res, next) => {
    try {
        // Calculate total cost from the `Cost` model
        const costs = await Cost.find();
        const totalAmountCost = costs.reduce((total, cost) => {
            const weekTotal = cost.week.reduce((sum, week) => sum + parseFloat(week.amount || 0), 0);
            return total + weekTotal;
        }, 0);

        // Calculate total payments from the `Employee` model
        const employees = await Employee.find();
        const totalPaymentAmount = employees.reduce((total, employee) => {
            return total + parseFloat(employee.paymentAmount || 0);
        }, 0);

        // // Calculate total invoice amount
        // const invoices = await InvoiceProject.find({}, "amount");
        // const totalAmount = invoices.reduce((total, invoice) => {
        //     return total + parseFloat(invoice.amount || 0);
        // }, 0);

        const invoices = await RevaluePayment.find({}, "orignalAmount");
        const totalAmount = invoices.reduce((total, invoice) => {
            return total + parseFloat(invoice.orignalAmount || 0);
        }, 0);

        console.log(invoices,totalAmount,"sdlfjsdflkjfs");
        // total employe
        const employeesLength=await Employee.find().countDocuments()
        const customerLength=await Customer.find().countDocuments()
        const projectListLength=await ProjectList.find().countDocuments()
        

        // Calculate total revenue
        const totlaCost = totalPaymentAmount + totalAmountCost;
        const totalRevinew = totalAmount - totlaCost;

        console.log(totalAmount,totalRevinew,"revinew");

        // Respond with the total revenue
        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Total revenue calculated successfully",
            data: { totalRevinew:totalRevinew,totlaCost:totalAmountCost,employeeCost:totalPaymentAmount ,totalEarn:totalAmount,employeesLength,customerLength,projectListLength},
        });
    } catch (error) {
        next(error);
    }
};


//   const totalRevenue = async (req, res, next) => {
//     try {
//         // Fetch all data concurrently
//         const [costs, employees, invoices] = await Promise.all([
//             Cost.find({}, "week"), // Only fetch the `week` field
//             Employee.find({}, "paymentAmount"), // Only fetch the `paymentAmount` field
//             InvoiceProject.find({}, "amount"), // Only fetch the `amount` field
//         ]);

//         // Calculate the total cost amount from the `week` arrays
//         const totalAmountCost = costs.reduce((total, cost) => {
//             const weekTotal = cost.week.reduce((sum, week) => sum + parseFloat(week.amount || 0), 0);
//             return total + weekTotal;
//         }, 0);

//         // Calculate the total payment amount from employees
//         const totalPaymentAmount = employees.reduce((total, employee) => {
//             return total + parseFloat(employee.paymentAmount || 0);
//         }, 0);

//         // Calculate the total invoice amount
//         const totalInvoiceAmount = invoices.reduce((total, invoice) => {
//             return total + parseFloat(invoice.amount || 0);
//         }, 0);

//         // Calculate total revenue
//         const totalRevenue = totalInvoiceAmount - (totalAmountCost + totalPaymentAmount);

//         // Respond with the total revenue
//         res.status(200).json({
//             status: "success",
//             statusCode: 200,
//             message: "Total revenue calculated successfully",
//             data: totalRevenue,
//         });
//     } catch (error) {
//         next(error); // Pass error to the global error handler
//     }
// };

  

module.exports={

    createCost,
    getAllCosts,
    getCostById,
    totalCost,
    totalRevinew
}