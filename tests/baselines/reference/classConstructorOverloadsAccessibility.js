//// [classConstructorOverloadsAccessibility.ts]
class A {
	public constructor(a: boolean) // error
	protected constructor(a: number) // error
	private constructor(a: string)
	private constructor() { 
		
	}
}

class B {
	protected constructor(a: number) // error
	constructor(a: string)
	constructor() { 
		
	}
}

class C {
	protected constructor(a: number)
	protected constructor(a: string)
	protected constructor() { 
		
	}
}

class D {
	constructor(a: number)
	constructor(a: string)
	public constructor() { 
		
	}
}

//// [classConstructorOverloadsAccessibility.js]
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    return B;
}());
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
var D = /** @class */ (function () {
    function D() {
    }
    return D;
}());


//// [classConstructorOverloadsAccessibility.d.ts]
declare class A {
    constructor(a: boolean);
    protected constructor(a: number);
    private constructor();
}
declare class B {
    protected constructor(a: number);
    constructor(a: string);
}
declare class C {
    protected constructor(a: number);
    protected constructor(a: string);
}
declare class D {
    constructor(a: number);
    constructor(a: string);
}
