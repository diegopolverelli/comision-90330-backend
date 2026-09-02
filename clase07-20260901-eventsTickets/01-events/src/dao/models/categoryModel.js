import mongoose from "mongoose";

export const CategoryModel=mongoose.model(
    "Category", 
    new mongoose.Schema(
        {
            description: {
                type: String, 
                unique: true, 
                required: true,
            }
        },
        {
            timestamps: true,
            strict: false, 
        }
    )
)