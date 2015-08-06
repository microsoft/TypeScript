interface A {
    (x: number): number;
    (x: string, y?: string): boolean;
    (x: Date): void;
    <T>(x: T[]): T[];
}

interface B {
    (x: number): number;
    (x: string): string;
    (x: Date): void;
    <T>(x: T[]): T[];
}

interface C {
    (x: string, ...y: string[]): number;
    (x: number, s?: string): number;
    <T>(x: T[]): T[];
}

var f: A | B | C;
var n = f(42);             // number
var s = f("abc");          // boolean | string | number
var a = f([true, false]);  // boolean[]
