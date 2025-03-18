//// [tests/cases/compiler/overload1.ts] ////

//// [overload1.ts]
module O {
    export class A {
        
    }

    export class B extends A {
    }

    export class C extends B {
        
    }

    export interface I {
        f(s:string):number;
        f(n:number):string;
        g(n1:number,n2:number):number;
        g(n:number):string;
        g(a:A):C;
        g(c:C):string;
        h(s1:string,s2:number):string;
        h(s1:number,s2:string):number;
    }
}

declare var x:O.I;

var e:string=x.g(new O.A()); // matches overload but bad assignment
var y:string=x.f(3); // good
y=x.f("nope"); // can't assign number to string
var z:string=x.g(x.g(3,3)); // good
z=x.g(2,2,2); // no match
z=x.g(); // no match
z=x.g(new O.B()); // ambiguous (up and down conversion)
z=x.h(2,2); // no match
z=x.h("hello",0); // good

var v=x.g;



//// [overload1.js]
var O;
(function (O) {
    class A {
    }
    O.A = A;
    class B extends A {
    }
    O.B = B;
    class C extends B {
    }
    O.C = C;
})(O || (O = {}));
var e = x.g(new O.A());
var y = x.f(3);
y = x.f("nope");
var z = x.g(x.g(3, 3));
z = x.g(2, 2, 2);
z = x.g();
z = x.g(new O.B());
z = x.h(2, 2);
z = x.h("hello", 0);
var v = x.g;
