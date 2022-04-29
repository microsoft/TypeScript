interface A {
    <T>(x: T): void;
    <T>(x: T): void;
}

function f<T>(a: T);
function f<T>(a: T);
function f(a) { }

interface I2 {
    f<T>(x: T): number;
    f<T>(x: T): string;
}

interface I3<T> {
    f(x: T): number;
    f(x: T): string;
}

class C2<T> {
}
var b: {
    new <T>(x: T, y: string): C2<T>;
    new <T>(x: T, y: string): C2<T>;
}

interface D {
    <T>(x: T): T;
    <T>(x: T): T;
}