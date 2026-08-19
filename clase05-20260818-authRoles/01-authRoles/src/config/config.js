process.loadEnvFile("./.env")

export const config={
    PORT: process.env.PORT, 
    DB_NAME: process.env.DB_NAME, 
    MONGO_URL: process.env.MONGO_URL, 
    SECRET: process.env.SECRET,
}