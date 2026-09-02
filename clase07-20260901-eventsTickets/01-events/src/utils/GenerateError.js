export class GenerateError{

    static appError(message, statusCode){
        // throw new Error("fallo algo...")
        let error = new Error(message)
        error.statusCode=statusCode
        throw error
    }

    static badRequestError(message){
        this.appError(message, 400)
    }

    static notFoundError(message){
        this.appError(message, 404)
    }

}