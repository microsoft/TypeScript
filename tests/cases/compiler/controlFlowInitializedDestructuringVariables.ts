// @strict: true

declare const obj: { a?: string, b?: number };
const {
    a = "0",
    b = +a,
} = obj;
