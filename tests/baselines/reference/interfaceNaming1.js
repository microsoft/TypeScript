//// [tests/cases/compiler/interfaceNaming1.ts] ////

//// [interfaceNaming1.ts]
interface { }
interface interface{ }
interface & { }


//// [interfaceNaming1.js]
interface;
{ }
interface & {};
