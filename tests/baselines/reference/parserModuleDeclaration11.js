//// [tests/cases/conformance/parser/ecmascript5/ModuleDeclarations/parserModuleDeclaration11.ts] ////

//// [parserModuleDeclaration11.ts]
declare module string {
    interface X { }
    export function foo(s: string);
}
string.foo("abc");
var x: string.X;


//// [parserModuleDeclaration11.js]
string.foo("abc");
var x;
