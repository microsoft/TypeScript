//// [tests/cases/compiler/arraySigChecking.ts] ////

//// [arraySigChecking.ts]
declare module M {
    interface iBar { t: any; }
    interface iFoo extends iBar {
        s: any;
    }

    class cFoo {
        t: any;
    }

    var foo: { [index: any]; }; // expect an error here
}

interface myInt {
    voidFn(): void;
}
var myVar: myInt;
var strArray: string[] = [myVar.voidFn()];


var myArray: number[][][];
myArray = [[1, 2]];

function isEmpty(l: { length: number }) {
    return l.length === 0;
}

isEmpty([]);
isEmpty(new Array(3));
isEmpty(new Array<string>(3));
isEmpty(['a']);


//// [arraySigChecking.js]
var myVar;
var strArray = [myVar.voidFn()];
var myArray;
myArray = [[1, 2]];
function isEmpty(l) {
    return l.length === 0;
}
isEmpty([]);
isEmpty(new Array(3));
isEmpty(new Array(3));
isEmpty(['a']);
