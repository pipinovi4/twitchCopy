export default class ApiError extends Error {
    public status: number;
    public errors: Error | Error[] | null;

    constructor(status: number, message: string, errors?: Error | Error[] | null) {
        super(message);
        this.status = status;
        this.errors = errors ? errors : null;
    };

    static UnAuthorizedError(): ApiError {
        return new ApiError(401, "User is not authorized");
    };

    static BadRequest(message: string, error?: Error | Error[]): ApiError {
        return new ApiError(400, message, error);
    };

    static UnforeseenError(message?: string, error?: Error): ApiError {
        return new ApiError(500, `Unforeseen error: ${message}`, error);
    };
};