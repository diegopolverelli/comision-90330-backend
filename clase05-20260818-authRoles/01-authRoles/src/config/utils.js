import bcrypt from "bcrypt"

export const createHash=pass=>bcrypt.hashSync(pass, 10)
export const validaHash=(pass, hash)=>bcrypt.compareSync(pass, hash)