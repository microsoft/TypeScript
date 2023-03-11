// https://github.com/microsoft/TypeScript/issues/52329
class Person {
    ["B"](a: number): string;
    ["A"](a: string|number): number | string {
      return 0;
    }
}
let p = new Person();
p.A(0)
p.B(0)

// https://github.com/microsoft/TypeScript/issues/17345
class C {
    ["foo"](): void
    ["bar"](): void;
    ["foo"]() {
        return 0;
    }
}

declare const uniqueSym: unique symbol;
declare const uniqueSym2: unique symbol;
declare const sym: symbol;

declare const strUnion: 'foo' | 'bar';

class C1 {
    [sym](): void;  // should error
    [uniqueSym2](): void;   // should error
    [uniqueSym](): void;
    [uniqueSym]() { }
}

interface I1 {
    [sym](): void;  // should error
    [uniqueSym2](): void;
    [uniqueSym](): void;
    [uniqueSym](): void;
}

class C2 {
    [strUnion](): void; // should error
    [strUnion]() { }
}

class I2 {
    [strUnion](): void; // should error
    [strUnion]() { }
}

class C3 {
    [1](): void;  // should error
    [2](): void;
    [2]() { }
}

interface I3 {
    [1](): void;
    [2](): void;
    [2](): void;
}