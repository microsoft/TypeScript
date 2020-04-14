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

// This has no excess error because variant one and three are both applicable.
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


//// [excessPropertyCheckWithMultipleDiscriminants.js]
// Repro from #32657
var foo = {
    type: "number",
    value: 10,
    multipleOf: 5,
    format: "what?"
};
// This has excess error because variant three is the only applicable case.
var a = {
    p1: 'left',
    p2: false,
    p3: 42,
    p4: "hello"
};
// This has no excess error because variant one and three are both applicable.
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
