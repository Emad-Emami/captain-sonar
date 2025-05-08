import { HttpErrorCode, ServerErrorParams } from '@CS/server/system/error/error.types';

export class ServerError extends Error {
    public code: HttpErrorCode;

    constructor({ message, code }: ServerErrorParams) {
        super(message);
        this.code = code;
        this.name = 'ServerError';
        Object.setPrototypeOf(this, ServerError.prototype);
    }
}