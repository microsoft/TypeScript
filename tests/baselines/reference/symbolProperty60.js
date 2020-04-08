//// [symbolProperty60.ts]
// https://github.com/Microsoft/TypeScript/issues/20146
interface I1 {
    [Symbol.toStringTag]: string;
    [key: string]: number;
}

interface I2 {
    [Symbol.toStringTag]: string;
    [key: number]: boolean;
}

declare const mySymbol: unique symbol;

interface I3 {
    [mySymbol]: string;
    [key: string]: number;
}

interface I4 {
    [mySymbol]: string;
    [key: number]: boolean;
}

//// [symbolProperty60.js]
