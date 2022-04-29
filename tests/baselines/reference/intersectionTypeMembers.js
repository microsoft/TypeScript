//// [intersectionTypeMembers.ts]
// An intersection type has those members that are present in any of its constituent types,
// with types that are intersections of the respective members in the constituent types

interface A { a: string }
interface B { b: string }
interface C { c: string }

var abc: A & B & C;
abc.a = "hello";
abc.b = "hello";
abc.c = "hello";

interface X { x: A }
interface Y { x: B }
interface Z { x: C }

var xyz: X & Y & Z;
xyz.x.a = "hello";
xyz.x.b = "hello";
xyz.x.c = "hello";

type F1 = (x: string) => string;
type F2 = (x: number) => number;

var f: F1 & F2;
var s = f("hello");
var n = f(42);

interface D {
    nested: { doublyNested: { d: string; }, different: { e: number } };
}
interface E {
    nested: { doublyNested: { f: string; }, other: {g: number } };
}
const de: D & E = {
    nested: {
        doublyNested: {
            d: 'yes',
            f: 'no'
        },
        different: { e: 12 },
        other: { g: 101 }
    }
}

// Additional test case with >2 doubly nested members so fix for #31441 is tested w/ excess props
interface F {
    nested: { doublyNested: { g: string; } }
}

interface G {
    nested: { doublyNested: { h: string; } }
}

const defg: D & E & F & G = {
    nested: {
        doublyNested: {
            d: 'yes',
            f: 'no',
            g: 'ok',
            h: 'affirmative'
        },
        different: { e: 12 },
        other: { g: 101 }
    }
}


//// [intersectionTypeMembers.js]
// An intersection type has those members that are present in any of its constituent types,
// with types that are intersections of the respective members in the constituent types
var abc;
abc.a = "hello";
abc.b = "hello";
abc.c = "hello";
var xyz;
xyz.x.a = "hello";
xyz.x.b = "hello";
xyz.x.c = "hello";
var f;
var s = f("hello");
var n = f(42);
var de = {
    nested: {
        doublyNested: {
            d: 'yes',
            f: 'no'
        },
        different: { e: 12 },
        other: { g: 101 }
    }
};
var defg = {
    nested: {
        doublyNested: {
            d: 'yes',
            f: 'no',
            g: 'ok',
            h: 'affirmative'
        },
        different: { e: 12 },
        other: { g: 101 }
    }
};
