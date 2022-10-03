// none of these function calls should be allowed
var x = function () { return; };
var r1 = x<number>();
var y: any = x;
var r2 = y<string>();

var c: Function;
var r3 = c<number>(); // should be an error

class C implements Function {
    prototype = null;
    length = 1;
    arguments = null;
    caller = () => { };
}

var c2: C;
var r4 = c2<number>(); // should be an error

class C2 extends Function { } // error
var c3: C2;
var r5 = c3<number>(); // error

interface I {
    (number): number;
}
var z: I;
var r6 = z<string>(1); // error

interface callable2<T> {
    (a: T): T;
}

var c4: callable2<number>;
c4<number>(1);
interface callable3<T> {
    (a: T): T;
}

var c5: callable3<number>;
c5<string>(1); // error

