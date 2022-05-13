export interface Response {
    status: number;
    data: any;
}

export interface ErrorResponse extends Response {
    status: number;
    data: {
        message: string;
        code: number;
    };
}