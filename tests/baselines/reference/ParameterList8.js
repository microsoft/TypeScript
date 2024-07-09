//// [tests/cases/compiler/ParameterList8.ts] ////

//// [ParameterList8.ts]
declare class C2 {
 constructor(public p1:string); // ERROR
 constructor(private p2:number); // ERROR
 constructor(public p3:any); // ERROR
}

//// [ParameterList8.js]
