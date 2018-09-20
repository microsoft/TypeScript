//// [parserParameterList7.ts]
class C1 {
 constructor(public p1:string); // ERROR
 constructor(private p2:number); // ERROR
 constructor(public p3:any) {} // OK
}

//// [parserParameterList7.js]
var C1 = /** @class */ (function () {
    function C1(p3) {
        this.p3 = p3;
    } // OK
    return C1;
}());
