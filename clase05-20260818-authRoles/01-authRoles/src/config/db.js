import mongoose from "mongoose"
export const conectar=async(uri, dbName)=>{
    try {
        await mongoose.connect(
            uri, 
            {
                dbName,
            }
        )
        console.log(`Conexión a DB establecida a db ${dbName}`)
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}