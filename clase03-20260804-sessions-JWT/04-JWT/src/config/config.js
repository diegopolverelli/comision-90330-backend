process.loadEnvFile("./.env")   // la versión de dotenv incorporada a node

export const config={
    database:{
        MONGO_URL: process.env.MONGO_URL,
        DB_NAME: process.env.DB_NAME,

    },
    general:{
        PORT: process.env.PORT, 
        SECRET: process.env.SECRET,
    }
}



