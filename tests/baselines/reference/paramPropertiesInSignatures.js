//// [paramPropertiesInSignatures.ts]
class C1 {
	constructor(public p1:string); // ERROR
	constructor(private p2:number); // ERROR
	constructor(public p3:any) {} // OK
}

declare class C2 {
	constructor(public p1:string); // ERROR
	constructor(private p2:number); // ERROR
	constructor(public p3:any); // ERROR
}

//// [paramPropertiesInSignatures.js]
var C1 = /** @class */ (function () {
    function C1(p3) {
        this.p3 = p3;
    } // OK
    return C1;
}());
