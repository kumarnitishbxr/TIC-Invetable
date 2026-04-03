import mongoose from 'mongoose';
import User from './user.model';

const disputeSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    raisedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mediator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    issue: String,
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'resolved'],
        default: 'pending'
    },
    resolutionNotes: String
}, {timestamps: true});

const Dispute = mongoose.model('Dispute', disputeSchema);


export default Dispute;