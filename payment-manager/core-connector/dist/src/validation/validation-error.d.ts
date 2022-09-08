export declare class ValidationError extends Error {
    validationErrors: string[];
    constructor(errorMessages: string[]);
    getValidationErrors: () => string[];
}
