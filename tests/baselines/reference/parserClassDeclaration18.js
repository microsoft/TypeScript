//// [tests/cases/conformance/parser/ecmascript5/ClassDeclarations/parserClassDeclaration18.ts] ////

//// [parserClassDeclaration18.ts]
declare class FooBase {
    constructor(s: string);
    constructor(n: number);
    constructor(x: any) {
    }
    bar1():void;
}

//// [parserClassDeclaration18.js]
