const Service = require('../models/Service'); // Make sure this path is correct

// Create a new service
const createService = async (req, res) => {
  try {
    const { title, link,  } = req.body;
    const { serviceImage } = req.files || {};
    const files = [];

    // Check if there are uploaded files
    if (serviceImage && Array.isArray(serviceImage)) {
        serviceImage.forEach((img) => {
            const publicFileUrl = `/images/users/${img.filename}`;
            files.push({
                publicFileUrl,
                path: img.filename,
            });
        });
    }
    const service = new Service({ title, link, serviceImage:files[0] });
    await service.save();
    res.status(200).json({status:"success",statusCode:200, message: 'Service created successfully', service });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create service', error });
  }
};

// Get all services
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve services', error });
  }
};

// Get a single service by ID
const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.query.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve service', error });
  }
};

// Update Service by ID
const updateService = async (req, res) => {
    try {
      const { id } = req.query; // Assuming the service ID is provided in the query parameters
      const { title, link } = req.body;
      const { serviceImage } = req.files || {};
      const files = [];
  
      // Check if there are new uploaded files
      if (serviceImage && Array.isArray(serviceImage)) {
        serviceImage.forEach((img) => {
          const publicFileUrl = `/images/users/${img.filename}`;
          files.push({
            publicFileUrl,
            path: img.filename,
          });
        });
      }

      console.log(files);
  
      // Prepare update data
      const updatedServiceData = { title, link };
      if (files[0]) {
        updatedServiceData.serviceImage = files[0]; // Update serviceImage if a new file is provided
      }
  
      // Find and update the service
      const updatedService = await Service.findByIdAndUpdate(id, updatedServiceData, { new: true });
  
      if (!updatedService) {
        return res.status(404).json({ status: "error", statusCode: 404, message: "Service not found" });
      }
  
      res.status(200).json({
        status: "success",
        statusCode: 200,
        message: "Service updated successfully",
        data: updatedService
      });
    } catch (error) {
      res.status(500).json({ status: "error", statusCode: 500, message: "Failed to update service", error });
    }
  };

  

// Delete a service by ID
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.query.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete service', error });
  }
};

module.exports={
    createService,
    updateService,
    getAllServices,
    getServiceById,
    deleteService
}