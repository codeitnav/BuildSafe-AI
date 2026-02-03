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
        sourceFileName: String,
        totalRequirements: Number,
        projectRisk: Object,
        results: [RequirementSchema]
    },
    { timestamps: true }
);

export default mongoose.model("Analysis", AnalysisSchema);