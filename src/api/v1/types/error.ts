export class AppError extends Error {
    public statusCode: number;
    public code: string;

    constructor(message: string, statusCode: number, code: string) {
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class ValidationError extends AppError {
    constructor(message: string) {
        super(message, 400, "VALIDATION_ERROR");
    }
}

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, 404, "NOT_FOUND");
    }
}
export class ServiceError extends Error {
    statusCode: number;
  
    constructor(message: string) {
      super(message);
      this.name = 'ServiceError';
      this.statusCode = 500; // Internal Server Error
    }
  }