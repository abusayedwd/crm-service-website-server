const pagination = require("../../../helpers/pagination");
const EmployeePayment = require("../models/EmployeePamyment");

// Create a new employee payment
const createPayment = async (req, res, next) => {
    try {
        const { name, amount, date,  employeeFunction, forWhat } = req.body;

        if (!name || !amount || !date || !employeeFunction || !forWhat) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                message: "All fields are required."
            });
        }

        const newPayment = new EmployeePayment({
            name,
            amount,
            date,
            function: employeeFunction,
            forWhat,
        });

        await newPayment.save();

        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Payment created successfully.",
            data: newPayment
        });
    } catch (error) {
        next(error);
    }
};

// Update an employee payment by ID
const updatePayment = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { name, amount, date, function: employeeFunction, forWhat } = req.body;

        const updatedPayment = await EmployeePayment.findByIdAndUpdate(
            id,
            { name, amount, date, function: employeeFunction, forWhat },
            { new: true, runValidators: true }
        );

        if (!updatedPayment) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Payment not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Payment updated successfully.",
            data: updatedPayment
        });
    } catch (error) {
        next(error);
    }
};

// Get all employee payments
const getAllPayments = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const paymentsLength = await EmployeePayment.find().countDocuments()
        const payments = await EmployeePayment.find()
        const paginationOfPost= pagination(paymentsLength,limit,page)


        res.status(200).json({
            status: "success",
            statusCode: 200,
            data: payments,
            pagination:paginationOfPost
        });
    } catch (error) {
        next(error);
    }
};

// Get an employee payment by ID
const getPaymentById = async (req, res, next) => {
    try {
        const { id } = req.query;

        const payment = await EmployeePayment.findById(id);

        if (!payment) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Payment not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            data: payment
        });
    } catch (error) {
        next(error);
    }
};

// Delete an employee payment by ID
const deletePayment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedPayment = await EmployeePayment.findByIdAndDelete(id);

        if (!deletedPayment) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Payment not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Payment deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPayment,
    updatePayment,
    getAllPayments,
    getPaymentById,
    deletePayment
};
