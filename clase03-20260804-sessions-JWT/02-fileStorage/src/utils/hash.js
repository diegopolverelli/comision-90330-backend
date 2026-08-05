import bcrypt from "bcrypt"

export const generaHash=password=>bcrypt.hashSync(password, 10)

export const validaPass=(pass, hash)=>bcrypt.compareSync(pass, hash)