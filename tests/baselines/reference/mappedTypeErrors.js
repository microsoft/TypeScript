//// [mappedTypeErrors.ts]

interface Shape {
    name: string;
    width: number;
    height: number;
    visible: boolean;
}

interface Named {
    name: string;
}

interface Point {
    x: number;
    y: number;
}

// Constraint checking

type T00 = { [P in P]: string };  // Error
type T01 = { [P in number]: string };  // Error
type T02 = { [P in Date]: number };  // Error
type T03 = Record<Date, number>;  // Error

type T10 = Pick<Shape, "name">;
type T11 = Pick<Shape, "foo">;  // Error
type T12 = Pick<Shape, "name" | "foo">;  // Error
type T13 = Pick<Shape, keyof Named>;
type T14 = Pick<Shape, keyof Point>;  // Error
type T15 = Pick<Shape, never>;
type T16 = Pick<Shape, undefined>;  // Error

function f1<T>(x: T) {
    let y: Pick<Shape, T>;  // Error
}

function f2<T extends string | number>(x: T) {
    let y: Pick<Shape, T>;  // Error
}

function f3<T extends keyof Shape>(x: T) {
    let y: Pick<Shape, T>;
}

function f4<T extends keyof Named>(x: T) {
    let y: Pick<Shape, T>;
}

// Type identity checking

function f10<T>() {
    type K = keyof T;
    var x: { [P in keyof T]: T[P] };
    var x: { [Q in keyof T]: T[Q] };
    var x: { [R in K]: T[R] };
}

function f11<T>() {
    var x: { [P in keyof T]: T[P] };
    var x: { [P in keyof T]?: T[P] };  // Error
    var x: { readonly [P in keyof T]: T[P] };  // Error
    var x: { readonly [P in keyof T]?: T[P] };  // Error
}

function f12<T>() {
    var x: { [P in keyof T]: T[P] };
    var x: { [P in keyof T]: T[P][] };  // Error
}

// Check that inferences to mapped types are secondary

declare function objAndReadonly<T>(primary: T, secondary: Readonly<T>): T;
declare function objAndPartial<T>(primary: T, secondary: Partial<T>): T;

function f20() {
    let x1 = objAndReadonly({ x: 0, y: 0 }, { x: 1 });  // Error
    let x2 = objAndReadonly({ x: 0, y: 0 }, { x: 1, y: 1 });
    let x3 = objAndReadonly({ x: 0, y: 0 }, { x: 1, y: 1, z: 1 });  // Error
}

function f21() {
    let x1 = objAndPartial({ x: 0, y: 0 }, { x: 1 });
    let x2 = objAndPartial({ x: 0, y: 0 }, { x: 1, y: 1 });
    let x3 = objAndPartial({ x: 0, y: 0 }, { x: 1, y: 1, z: 1 });  // Error
}

//// [mappedTypeErrors.js]
function f1(x) {
    var y; // Error
}
function f2(x) {
    var y; // Error
}
function f3(x) {
    var y;
}
function f4(x) {
    var y;
}
// Type identity checking
function f10() {
    var x;
    var x;
    var x;
}
function f11() {
    var x;
    var x; // Error
    var x; // Error
    var x; // Error
}
function f12() {
    var x;
    var x; // Error
}
function f20() {
    var x1 = objAndReadonly({ x: 0, y: 0 }, { x: 1 }); // Error
    var x2 = objAndReadonly({ x: 0, y: 0 }, { x: 1, y: 1 });
    var x3 = objAndReadonly({ x: 0, y: 0 }, { x: 1, y: 1, z: 1 }); // Error
}
function f21() {
    var x1 = objAndPartial({ x: 0, y: 0 }, { x: 1 });
    var x2 = objAndPartial({ x: 0, y: 0 }, { x: 1, y: 1 });
    var x3 = objAndPartial({ x: 0, y: 0 }, { x: 1, y: 1, z: 1 }); // Error
}


//// [mappedTypeErrors.d.ts]
interface Shape {
    name: string;
    width: number;
    height: number;
    visible: boolean;
}
interface Named {
    name: string;
}
interface Point {
    x: number;
    y: number;
}
declare type T00 = {
    [P in P]: string;
};
declare type T01 = {
    [P in number]: string;
};
declare type T02 = {
    [P in Date]: number;
};
declare type T03 = Record<Date, number>;
declare type T10 = Pick<Shape, "name">;
declare type T11 = Pick<Shape, "foo">;
declare type T12 = Pick<Shape, "name" | "foo">;
declare type T13 = Pick<Shape, keyof Named>;
declare type T14 = Pick<Shape, keyof Point>;
declare type T15 = Pick<Shape, never>;
declare type T16 = Pick<Shape, undefined>;
declare function f1<T>(x: T): void;
declare function f2<T extends string | number>(x: T): void;
declare function f3<T extends keyof Shape>(x: T): void;
declare function f4<T extends keyof Named>(x: T): void;
declare function f10<T>(): void;
declare function f11<T>(): void;
declare function f12<T>(): void;
declare function objAndReadonly<T>(primary: T, secondary: Readonly<T>): T;
declare function objAndPartial<T>(primary: T, secondary: Partial<T>): T;
declare function f20(): void;
declare function f21(): void;
