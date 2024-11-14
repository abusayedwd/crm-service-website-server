const pagination = require('../../../helpers/pagination');
const Response = require('../../../helpers/respones');
const WorkHour = require('../models/WorkHour');

// Create a WorkHour entry

const createWorkHour = async (req, res, next) => {
    try {
        const { employeeId, projectId, weekName, dayName, hours } = req.body;

        if (!employeeId || !projectId || !weekName || !dayName || hours === undefined) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields: employeeId, projectId, weekName, dayName, or hours"
            });
        }

        // Check if a WorkHour entry already exists for the employee and project
        const existingWorkHour = await WorkHour.findOne({ employeId: employeeId, projectId });

        if (existingWorkHour) {
            return res.status(409).json(Response({
                statusCode:409,
                status: "error",
                message: "A work hour entry already exists for this employee and project"
            }));
        }

        // Create a new WorkHour entry if none exists
        const newWorkHourEntry = new WorkHour({
            employeId: employeeId,
            projectId,
            week: [
                {
                    weekName,
                    dayName: [{ dayName, hours }]
                }
            ]
        });

        // Save the new work hour entry
        const savedWorkHourEntry = await newWorkHourEntry.save();

        res.status(201).json(Response({
            status: "success",
            statusCode:201,
            message: "Work hour entry created successfully",
            data: savedWorkHourEntry
        }));
    } catch (error) {
        next(error);
    }
};

// updated 

const updateWorkHour = async (req, res, next) => {
    try {
        const { weekName, dayName, hours } = req.body;
        const {id}=req.query

        if ( !weekName || !dayName || hours === undefined) {
            return res.status(400).json({
                statusCode:400,
                status: "error",
                message: "Missing required fields: employeeId, projectId, weekName, dayName, or hours"
            });
        }

        // Find the existing WorkHour entry for the specified employee and project
        let workHourEntry = await WorkHour.findById(id);
        console.log(workHourEntry);

        if (!workHourEntry) {
            return res.status(404).json({
                statusCode:404,
                status: "error",
                message: "No existing work hour entry found for the specified employee and project"
            });
        }

        // Find the specific week within the WorkHour entry
        let week = workHourEntry.week.find(w => w.weekName === weekName);

        if (!week) {
            // If the week does not exist, create a new week with the provided day and hours
            workHourEntry.week.push({
                weekName,
                dayName: [{ dayName, hours }]
            });
        } else {
            // Find the specific day within the week
            let day = week.dayName.find(d => d.dayName === dayName);

            if (day) {
                // If the day exists, update its hours
                day.hours = hours;
            } else {
                // If the day does not exist, add a new day with the specified hours
                week.dayName.push({ dayName, hours });
            }
        }

        // Save the updated work hour entry
        const updatedWorkHourEntry = await workHourEntry.save();

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Work hour entry updated successfully",
            data: updatedWorkHourEntry
        });
    } catch (error) {
        next(error);
    }
};

const showWorkHoursByProjectAndWeek = async (req, res, next) => {
    try {

        
        // for pagination 
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

        const { projectId, weekName } = req.query;

        if (!projectId) {
            return res.status(400).json(Response({
                status: "error",
                statusCode:400,
                message: "Missing required field: projectId"
            }));
        }

        // Build query to filter by projectId and, optionally, by weekName if provided
        const filter = { projectId };
        if (weekName) {
            filter["week.weekName"] = weekName;
        }

        // Retrieve work hours for the specified project and week
        const workHoursLength = await WorkHour.find(filter).countDocuments()
        const workHours = await WorkHour.find(filter).populate("employeId", "name")
        .skip((page - 1) * limit)
        .limit(limit);

        if (!workHours.length) {
            return res.status(404).json(Response({
                status: "error",
                statusCode:404,
                message: "No work hour entries found for the specified project and week"
            }));
        }

        // Format the response to group hours by employee and week
        const response = workHours.map(entry => {
            console.log(entry);
            const employeeInfo = {
                _id: entry._id,
                employeeName: entry.employeId.name,
                projectId: entry.projectId,
                weekData: entry.week
                    .filter(week => !weekName || week.weekName === weekName) // Filter by weekName if provided
                    .map(week => ({
                        weekName: week.weekName,
                        totalHours: week.dayName.reduce((sum, day) => sum + parseFloat(day.hours), 0),
                        days: week.dayName
                    }))
            };
            return employeeInfo;
        });

        const customePagination=pagination(workHoursLength,limit,page)

        res.status(200).json(Response({
            status: "success",
            statusCode:200,
            data: response,
            message:"show successfully",
            pagination:customePagination
        }));
    } catch (error) {
        next(error);
    }
};





// Controller to show work hours by week
const showWorkHours = async (req, res, next) => {
    try {
        const { projectId, weekName } = req.query;

        if (!projectId) {
            return res.status(400).json({
                status: "error",
                message: "Missing required field: projectId"
            });
        }

        // Build query filter based on optional weekName
        const filter = {
            projectId: projectId,
            ...(weekName && { 'week.weekName': weekName }) // Only add week filter if weekName is provided
        };
console.log(filter);
        // Fetch all work hour entries that match the filter
        const workHourEntries = await WorkHour.find(filter);

        if (!workHourEntries.length) {
            return res.status(404).json({
                status: "error",
                message: "No work hour entries found for the specified project"
            });
        }

        // Prepare the response data by iterating over each work hour entry
        const response = workHourEntries.map(entry => {
            return entry.week.map(week => {
                // Calculate total hours for the week
                console.log(week);
                const totalHours = week.dayName.reduce((sum, day) => sum + parseFloat(day.hours), 0);
                return {
                    projectId: entry.projectId,
                    weekName: week.weekName,
                    days: week.dayName,
                    totalHours
                };
            });
        }).flat(); // Flatten the array of arrays

        // Filter response by weekName if provided
        const filteredResponse = weekName ? response.filter(w => w.weekName === weekName) : response;

        res.status(200).json({
            status: "success",
            data: filteredResponse
        });
    } catch (error) {
        next(error);
    }
};




// Show a specific WorkHour entry by ID
const getWorkHourById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const workHour = await WorkHour.findById(id).populate('employeId').populate('projectId');

        if (!workHour) {
            return res.status(404).json({ message: "Work hour not found" });
        }

        res.status(200).json({
            status: "success",
            statusCode: 200,
            message: "Work hour retrieved successfully",
            data: workHour
        });
    } catch (error) {
        next(error);
    }
};

// Show all WorkHour entries
const getAllWorkHours = async (req, res, next) => {
    try {
        const workHours = await WorkHour.find().populate('employeId').populate('projectId');
        res.status(200).json(Response({
            status: "success",
            statusCode: 200,
            message: "All work hours retrieved successfully",
            data: workHours
        }));
    } catch (error) {
        next(error);
    }
};



module.exports = {
    createWorkHour,
    showWorkHours,
    getWorkHourById,
    getAllWorkHours,
    updateWorkHour,
    
    showWorkHoursByProjectAndWeek
};
