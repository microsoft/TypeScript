//// [tests/cases/conformance/types/namedTypes/interfaceWithPrivateMember.ts] ////

//// [interfaceWithPrivateMember.ts]
// interfaces do not permit private members, these are errors

interface I {
    private x: string;
}

interface I2<T> {
    private y: T;
}

var x: {
    private y: string;
}

//// [interfaceWithPrivateMember.js]
// interfaces do not permit private members, these are errors
var x;
