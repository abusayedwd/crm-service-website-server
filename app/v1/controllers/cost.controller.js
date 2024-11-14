const Response = require('../../../helpers/respones');
const Cost = require('../models/Cost');


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


module.exports={

    createCost,
    getAllCosts,
    getCostById
}