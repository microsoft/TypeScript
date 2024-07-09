// Each pair of call signatures in these types have a duplicate signature error.
// Identical call signatures should generate an error.
interface I {
    (x): number;
    (x: any): number;
    <T>(x: T): T;
    <U>(x: U): U; // error
}

interface I2<T> {
    (x: T): T;
    (x: T): T; // error
}

var a: {
    (x): number;
    (x: any): number;
    <T>(x: T): T;
    <T>(x: T): T; // error
}