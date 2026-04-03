import User from "../models/user.model.js"
import Job from "../models/job.model.js";
import Dispute from "../models/dispute.model.js";

export const Overview = async (req, res) => {
    try{
        const totalUsers = await User.countDocuments();
        const activeJobs = await Job.countDocuments({
            status: {
                $in: ['open', 'pending', 'assigned']
            }
        });
        
        const activeDisputes = await Dispute.countDocuments({
            status: 'in-progress'
        });
        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                activeJobs,
                activeDisputes
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
} 

export const listUsers = async (req, res) => {
    try{
        const users = await User.find().limit(100).select('-password');

        res.status(200).json({
            success: true,
            data: {
                users
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const listJobs = async (req, res) => {
    try{
        const jobs = await Job.find().limit(100).populate('employer', 'name emailId contact').populate('name emailId contact');
        res.status(200).json({
            success: true,
            data: {
                jobs
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const listDisputes = async (req, res) => {
    try{
        const disputes = await Dispute.find().limit(100).populate('job').populate('raisedBy', 'name email phone').populate('mediator', 'name email phone');
        res.status(200).json({
            success: true,
            data: {
                disputes
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const resolveDispute = async (req, res) => {
    try{
        const { disputeId } = req.params;
        const { resolutionNotes } = req.body;
        const dispute = await Dispute.findById(disputeId);
        if(!dispute){
            return res.status(404).json({
                success: false,
                message: 'Dispute not found'
            });
        }
        dispute.status = 'resolved';
        dispute.resolutionNotes = resolutionNotes;
        await dispute.save();
        res.status(200).json({
            success: true,
            message: 'Dispute resolved successfully',
            data: {
                dispute
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const blockUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        };
        user.isBlocked = true;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User blocked successfully',
            data: {
                user
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const unblockUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        };
        user.isBlocked = false;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User unblocked successfully',
            data: {
                user
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const deleteUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        };
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const deleteJob = async (req, res) => {
    try{
        const job = await Job.findById(req.params.jobId);
        if(!job){
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            })
        }
        await Job.findByIdAndDelete(req.params.jobId);
        res.status(200).json({
            success: true,
            message: 'Job deleted successfully'
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const deleteDispute = async (req, res) => {
    try{
        const dispute = await Dispute.findById(req.params.disputeId);
        if(!dispute){
            return res.status(404).json({
                success: false,
                message: 'Dispute not found'
            })
        }
        await Dispute.findByIdAndDelete(req.params.disputeId);
        res.status(200).json({
            success: true,
            message: 'Dispute deleted successfully'
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const assignMediator = async (req, res) => {
    try{
        const { disputeId } = req.params;
        const { mediatorId } = req.body;
        const dispute = await Dispute.findById(disputeId);
        if(!dispute){
            return res.status(404).json({
                success: false,
                message: 'Dispute not found'
            });
        }
        const mediator = await User.findById(mediatorId);
        if(!mediator){
            return res.status(404).json({
                success: false,
                message: 'Mediator not found'
            });
        }
        dispute.mediator = mediatorId;
        await dispute.save();
        res.status(200).json({
            success: true,
            message: 'Mediator assigned successfully',
            data: {
                dispute
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const verifyUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not Found"                
            })
        }
        user.verified = true;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User verified successfully',
            data: {
                user
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const unverifyUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        } 
        user.verified = false;
        await user.save();
        res.status(200).json({
            success: true,
            message: 'User unverified successfully',
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getUserDetails = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId).select("-password");
        if(!user) res.status(404).json({
            success: false,
            message: "User not found"
        });
        res.status(200).json({
            success: true,
            data: {
                user
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getJobDetails = async (req, res) => {
    try{
        const job = await Job.findById(req.params.jobId).populate('employer', 'name emailId contact').populate('employee', 'Name emailId phone');
        if(!job) return res.status(404).json({
            success: false,
            message: "job not found"
        })
        res.status(200).json({
            success: true,
            data:{
                job
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getDisputeDetails = async (req, res) => {
    try{
        const dispute = await Dispute.findById(req.params.disputeId).populate('job').populate('raisedBy', 'name email phone').populate('mediator', 'name email phone');
        if(!dispute){
            res.status(404).json({
                success: false,
                message: 'Dispute not found'
            });
        }
        res.status(200).json({
            success: true,
            data: {
                dispute
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getAllMediators = async (req, res) => {
    try{
        const mediators = await User.find({ role: 'mediator' });
        res.status(200).json({
            success: true,
            data: {
                mediators
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getAllEmployers = async(req, res) => {
    try{
        const employers = await User.find({ role: 'employer' });
        res.status(200).json({
            success: true,
            data: {
                employers
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

export const getAllLabourers = async (req, res) => {
    try{
        const labourers = await User.find({ role: 'labourer '});
        res.status(200).json({
            success: true,
            data: {
                labourers
            }
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}