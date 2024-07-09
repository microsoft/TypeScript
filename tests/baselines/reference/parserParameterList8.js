//// [tests/cases/conformance/parser/ecmascript5/ParameterLists/parserParameterList8.ts] ////

//// [parserParameterList8.ts]
declare class C2 {
 constructor(public p1:string); // ERROR
 constructor(private p2:number); // ERROR
 constructor(public p3:any); // ERROR
}

//// [parserParameterList8.js]
