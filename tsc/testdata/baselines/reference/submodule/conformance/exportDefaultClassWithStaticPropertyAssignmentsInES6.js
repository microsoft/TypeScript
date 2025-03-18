//// [tests/cases/conformance/es6/classDeclaration/exportDefaultClassWithStaticPropertyAssignmentsInES6.ts] ////

//// [exportDefaultClassWithStaticPropertyAssignmentsInES6.ts]
export default class {
    static z: string = "Foo";
}

//// [exportDefaultClassWithStaticPropertyAssignmentsInES6.js]
export default class {
    static z = "Foo";
}
