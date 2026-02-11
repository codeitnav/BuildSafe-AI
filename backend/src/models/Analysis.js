import mongoose from "mongoose";

const RequirementSchema = new mongoose.Schema(
    {
        requirement: String,
        issues: Array,
        aiAnalysis: Object,
        risk: Object
    },
    { _id: false }
);

const AnalysisSchema = new mongoose.Schema(
{
    ownerType: {
        type: String,
        enum: ["anonymous", "user"],
        required: true
    },

    ownerId: {
        type: String,
        required: true,
        index: true
    },

    sourceFileName: String,
    totalRequirements: Number,
    projectRisk: Object,
    results: [RequirementSchema]
},
{ timestamps: true }
);


export default mongoose.model("Analysis", AnalysisSchema);