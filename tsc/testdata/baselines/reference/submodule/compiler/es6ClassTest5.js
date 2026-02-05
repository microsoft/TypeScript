//// [tests/cases/compiler/es6ClassTest5.ts] ////

//// [es6ClassTest5.ts]
class C1T5 {
    foo: (i: number, s: string) => number = 
	   	(i) => {
	        return i;
	    }
}
namespace C2T5 {}

class  bigClass {
     public break = 1;
}


//// [es6ClassTest5.js]
"use strict";
class C1T5 {
    foo = (i) => {
        return i;
    };
}
class bigClass {
    break = 1;
}
