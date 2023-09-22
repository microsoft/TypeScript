//// [tests/cases/compiler/excessPropertyCheckWithMultipleDiscriminants.ts] ////

//// [excessPropertyCheckWithMultipleDiscriminants.ts]
// Repro from #32657

interface Base<T> {
    value: T;
}

interface Int extends Base<number> {
    type: "integer";
    multipleOf?: number;
}

interface Float extends Base<number> {
    type: "number";
}

interface Str extends Base<string> {
    type: "string";
    format?: string;
}

interface Bool extends Base<boolean> {
    type: "boolean";
}

type Primitive = Int | Float | Str | Bool;

const foo: Primitive = {
    type: "number",
    value: 10,
    multipleOf: 5, // excess property
    format: "what?"
}


type DisjointDiscriminants = { p1: 'left'; p2: true; p3: number } | { p1: 'right'; p2: false; p4: string } | { p1: 'left'; p2: boolean };

// This has excess error because variant three is the only applicable case.
const a: DisjointDiscriminants = {
    p1: 'left',
    p2: false,
    p3: 42,
    p4: "hello"
};

// This has excess error because variant two is not applicable.
const b: DisjointDiscriminants = {
    p1: 'left',
    p2: true,
    p3: 42,
    p4: "hello"
};

// This has excess error because variant two is the only applicable case
const c: DisjointDiscriminants = {
    p1: 'right',
    p2: false,
    p3: 42,
    p4: "hello"
};

// Repro from #51873

interface Common {
    type: "A" | "B" | "C" | "D";
    n: number;
}
interface A {
    type: "A";
    a?: number;
}
interface B {
    type: "B";
    b?: number;
}

type CommonWithOverlappingOptionals = Common | (Common & A) | (Common & B);

// Should reject { b } because reduced to Common | (Common & A)
const c1: CommonWithOverlappingOptionals = {
    type: "A",
    n: 1,
    a: 1,
    b: 1  // excess property
}

type CommonWithDisjointOverlappingOptionals = Common | A | B;

// Should still reject { b } because reduced to Common | A, even though these are now disjoint
const c2: CommonWithDisjointOverlappingOptionals = {
    type: "A",
    n: 1,
    a: 1,
    b: 1  // excess property
}

// Repro from https://github.com/microsoft/TypeScript/pull/51884#issuecomment-1472736068

export type BaseAttribute<T> = {
    type?: string | undefined;
    required?: boolean | undefined;
    defaultsTo?: T | undefined;
};

export type Attribute =
    | string
    | StringAttribute
    | NumberAttribute
    | OneToOneAttribute

export type Attribute2 =
    | string
    | StringAttribute
    | NumberAttribute

export type StringAttribute = BaseAttribute<string> & {
    type: 'string';
};

export type NumberAttribute = BaseAttribute<number> & {
    type: 'number';
    autoIncrement?: boolean | undefined;
};

export type OneToOneAttribute = BaseAttribute<any> & {
    model: string;
};

// both should error due to excess properties
const attributes: Attribute = {
    type: 'string',
    autoIncrement: true,
    required: true,
};

const attributes2: Attribute2 = {
    type: 'string',
    autoIncrement: true,
    required: true,
};


//// [excessPropertyCheckWithMultipleDiscriminants.js]
"use strict";
// Repro from #32657
Object.defineProperty(exports, "__esModule", { value: true });
var foo = {
    type: "number",
    value: 10,
    multipleOf: 5, // excess property
    format: "what?"
};
// This has excess error because variant three is the only applicable case.
var a = {
    p1: 'left',
    p2: false,
    p3: 42,
    p4: "hello"
};
// This has excess error because variant two is not applicable.
var b = {
    p1: 'left',
    p2: true,
    p3: 42,
    p4: "hello"
};
// This has excess error because variant two is the only applicable case
var c = {
    p1: 'right',
    p2: false,
    p3: 42,
    p4: "hello"
};
// Should reject { b } because reduced to Common | (Common & A)
var c1 = {
    type: "A",
    n: 1,
    a: 1,
    b: 1 // excess property
};
// Should still reject { b } because reduced to Common | A, even though these are now disjoint
var c2 = {
    type: "A",
    n: 1,
    a: 1,
    b: 1 // excess property
};
// both should error due to excess properties
var attributes = {
    type: 'string',
    autoIncrement: true,
    required: true,
};
var attributes2 = {
    type: 'string',
    autoIncrement: true,
    required: true,
};
