//// [tests/cases/compiler/ParameterList7.ts] ////

//// [ParameterList7.ts]
class C1 {
 constructor(public p1:string); // ERROR
 constructor(private p2:number); // ERROR
 constructor(public p3:any) {} // OK
}

//// [ParameterList7.js]
class C1 {
    p3;
    constructor(p3) {
        this.p3 = p3;
    }
}
