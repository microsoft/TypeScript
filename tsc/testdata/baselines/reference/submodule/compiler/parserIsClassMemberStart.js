//// [tests/cases/compiler/parserIsClassMemberStart.ts] ////

//// [parserIsClassMemberStart.ts]
class C {
    type!: number;
}


//// [parserIsClassMemberStart.js]
class C {
    type;
}
