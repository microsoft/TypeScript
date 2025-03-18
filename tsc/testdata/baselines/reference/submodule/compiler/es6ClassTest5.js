//// [tests/cases/compiler/es6ClassTest5.ts] ////

//// [es6ClassTest5.ts]
class C1T5 {
    foo: (i: number, s: string) => number = 
	   	(i) => {
	        return i;
	    }
}
module C2T5 {}

class  bigClass {
     public break = 1;
}


//// [es6ClassTest5.js]
class C1T5 {
    foo = (i) => {
        return i;
    };
}
class bigClass {
    break = 1;
}
