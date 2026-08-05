import mongoose from "mongoose"

export const connDB=async(uri, dbName)=>{
    try {
        await mongoose.connect(
            uri,
            {
                dbName
            }
        )
        console.log(`DB online...!!!`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
    }
}