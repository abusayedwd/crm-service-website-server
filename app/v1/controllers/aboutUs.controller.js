const Response = require("../../../helpers/respones");
const { AboutUs } = require("../models/AboutUs");

const showAboutUs=async(req,res,next)=>{
    try {
        const user=req.user.role

        if(user!=="admin"){
            return res.status(401).json(Response({ statusCode: 401, message: 'you are not admin.',status:'faield' }));

        }

        const about=await AboutUs.findOne()
        return res.status(200).json(Response({ statusCode: 200, message: 'show about successfully.',status:'success',data:about }));

        
    } catch (error) {
        next(error)
    }
}

const updateAboutUs = async (req, res, next) => {
    try {
        // Check if the user has the admin role
        if (req.user.role !== "admin") {
            return res.status(401).json({
                status: 'failed',
                statusCode: 401,
                message: 'You are not authorized to update this information.'
            });
        }

        // Retrieve the fields to update from the request body
        const {id,text} = req.body;

        // Find the first AboutUs document and update it with the provided fields
        const updatedAboutUs = await AboutUs.findByIdAndUpdate(id,{aboutUsText:text},{new:true}) 
            
        // Check if the document exists
        if (!updatedAboutUs) {
            return res.status(404).json({
                status: 'failed',
                statusCode: 404,
                message: 'No "About Us" information found to update.'
            });
        }

        // Send successful response with the updated data
        res.status(200).json(Response({
            status: 'success',
            statusCode: 200,
            message: 'About Us information updated successfully.',
            data: updatedAboutUs
        }));
    } catch (error) {
        // Pass any errors to the global error handler
        next(error);
    }
};


module.exports={
    showAboutUs,
    updateAboutUs
}