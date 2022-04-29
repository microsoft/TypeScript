//// [optionalPropertiesInClasses.ts]
interface ifoo {
	x?:number;
	y:number;
}

class C1 implements ifoo {
	public y:number;
}

class C2 implements ifoo { // ERROR - still need 'y'
	public x:number;
}

class C3 implements ifoo {
	public x:number;
	public y:number;
}

//// [optionalPropertiesInClasses.js]
var C1 = /** @class */ (function () {
    function C1() {
    }
    return C1;
}());
var C2 = /** @class */ (function () {
    function C2() {
    }
    return C2;
}());
var C3 = /** @class */ (function () {
    function C3() {
    }
    return C3;
}());
