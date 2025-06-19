class ApiResponse{
    consructor(statusCode, message = "Success", data = null) {
        this.statusCode = statusCode; // HTTP status code
        this.message = message; // Response message
        this.data = data; // Data to be returned in the response
        this.success = statusCode < 400; // Indicates operation success
    }
}