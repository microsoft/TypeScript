function f1(x: string): number { return null; }

function f2(x: string): string { return null; }

function f3(x: number): number { return null; }

function f4(x: string): string;

function f4(x: number): number;

function f4(x: any): any { return undefined; }

var g: (s1: string) => number;

g = f1; // OK 

g = f2; // Error

g = f3; // Error

g = f4; // Error

class C {
    constructor(x: string);
constructor(x: any) {}
}

var d: new(x: number) => void;

d = C; // Error