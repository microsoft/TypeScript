//// [mappedTypeErrors.ts]

type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
}

type Record<K extends string | number, T> = {
    [_ in K]: T;
}

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

type T00 = { [P in P]: string };  // Error
type T01 = { [P in Date]: number };  // Error
type T02 = Record<Date, number>;  // Error

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


//// [mappedTypeErrors.d.ts]
declare type Partial<T> = {
    [P in keyof T]?: T[P];
};
declare type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
declare type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
declare type Record<K extends string | number, T> = {
    [_ in K]: T;
};
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
    [P in Date]: number;
};
declare type T02 = Record<Date, number>;
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
