export type ServerErrorParams = {
  message: string;
  code: HttpErrorCode;
};

export enum HttpErrorCode {
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
    ServiceUnavailable = 503,
    // Add more HTTP error codes as needed
}