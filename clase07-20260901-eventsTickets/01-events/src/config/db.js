import mongoose from "mongoose"

export const conectar=async(uriMongo, dbName)=>{
    try {
        await mongoose.connect(
            uriMongo,
            {
                dbName
            }
        )
        console.log(`Conexión a DB establecida`)
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}
