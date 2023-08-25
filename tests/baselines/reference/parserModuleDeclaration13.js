//// [tests/cases/conformance/parser/ecmascript5/ModuleDeclarations/parserModuleDeclaration13.ts] ////

//// [parserModuleDeclaration13.ts]
// https://github.com/microsoft/TypeScript/issues/11167

declare module 
     my.very.long.name.foo.bar.baz.able.baker {}

//// [parserModuleDeclaration13.js]
// https://github.com/microsoft/TypeScript/issues/11167
