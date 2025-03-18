//// [tests/cases/compiler/es6ClassSuperCodegenBug.ts] ////

//// [es6ClassSuperCodegenBug.ts]
class A {
	constructor(str1:string, str2:string) {}
}
class B extends A {
    constructor() {
	    if (true) {
	        super('a1', 'b1');
	    } else {
	        super('a2', 'b2');
	    }
    }
}


//// [es6ClassSuperCodegenBug.js]
class A {
    constructor(str1, str2) { }
}
class B extends A {
    constructor() {
        if (true) {
            super('a1', 'b1');
        }
        else {
            super('a2', 'b2');
        }
    }
}
