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

