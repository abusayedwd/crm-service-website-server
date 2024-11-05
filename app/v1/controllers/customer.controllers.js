const pagination = require('../../../helpers/pagination');
const Customer = require('../models/Customer'); // Import the Customer model

// Create Customer Controller
const createCustomer = async (req, res, next) => {
    try {
        const { name, address, city, contactPerson, email, gender, postalCode, mobile, state, billingEmail } = req.body;
        const { customerImage } = req.files || {};

        if (!name || !address || !city || !contactPerson || !email || !gender || !postalCode || !mobile || !state || !billingEmail) {
            return res.status(400).json({
                status: "error",
                statusCode: 400,
                message: "All fields are required."
            });
        }

        const files = [];
        if (customerImage && Array.isArray(customerImage)) {
            customerImage.forEach((img) => {
                const publicFileUrl = `/images/customers/${img.filename}`;
                files.push({
                    publicFileUrl,
                    path: img.filename,
                });
            });
        }

        const newCustomer = new Customer({
            name,
            address,
            city,
            customerImage: files[0],
            contactPerson,
            email,
            gender,
            postalCode,
            mobile,
            state,
            billingEmail,
        });

        await newCustomer.save();

        res.status(201).json({
            status: "success",
            statusCode: 201,
            message: "Customer created successfully.",
            data: newCustomer
        });
    } catch (error) {
        next(error);
    }
};

// Show All Customers Controller
const showAllCustomers = async (req, res, next) => {
    try {

          // for pagination 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

        const customersLength = await Customer.find().countDocuments()

        const customers = await Customer.find()
        .skip((page - 1) * limit)
           .limit(limit);

           const customePagination=pagination(customersLength,limit,page)

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Customers retrieved successfully.",
            data: customers,
            pagination:customePagination
        });
    } catch (error) {
        next(error);
    }
};

// Show Customer by ID Controller
const showCustomerById = async (req, res, next) => {
    try {
        const { id } = req.query;
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Customer not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Customer retrieved successfully.",
            data: customer
        });
    } catch (error) {
        next(error);
    }
};

// Update Customer Controller
const updateCustomer = async (req, res, next) => {
    try {
        const { id } = req.query;
        const { name, address, city, contactPerson, email, gender, postalCode, mobile, state, billingEmail } = req.body;
        const { customerImage } = req.files || {};

        const files = [];
        if (customerImage && Array.isArray(customerImage)) {
            customerImage.forEach((img) => {
                const publicFileUrl = `/images/customers/${img.filename}`;
                files.push({
                    publicFileUrl,
                    path: img.filename,
                });
            });
        }

        const updatedData = {
            ...(name && { name }),
            ...(address && { address }),
            ...(city && { city }),
            ...(files[0] && { customerImage: files[0] }),
            ...(contactPerson && { contactPerson }),
            ...(email && { email }),
            ...(gender && { gender }),
            ...(postalCode && { postalCode }),
            ...(mobile && { mobile }),
            ...(state && { state }),
            ...(billingEmail && { billingEmail }),
        };

        const updatedCustomer = await Customer.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedCustomer) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Customer not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Customer updated successfully.",
            data: updatedCustomer
        });
    } catch (error) {
        next(error);
    }
};

// Delete Customer Controller
const deleteCustomer = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedCustomer = await Customer.findByIdAndDelete(id);

        if (!deletedCustomer) {
            return res.status(404).json({
                status: "error",
                statusCode: 404,
                message: "Customer not found."
            });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Customer deleted successfully."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCustomer,
    showAllCustomers,
    showCustomerById,
    updateCustomer,
    deleteCustomer
};
