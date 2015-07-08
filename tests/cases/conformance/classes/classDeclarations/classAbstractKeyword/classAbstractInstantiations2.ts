class A {
    // ...
}

abstract class B {
    foo(): number { return this.bar(); }
    abstract bar() : number;
}

new B; // error

var BB: typeof B = B;
var AA: typeof A = BB; // error, AA is not of abstract type.
new AA;

function constructB(Factory : typeof B) {
    new Factory; // error -- Factory is of type typeof B.
}

var BB = B;
new BB; // error -- BB is of type typeof B.

var x : any = C;
new x; // okay -- undefined behavior at runtime

class C extends B { } // error -- not declared abstract

abstract class D extends B { } // okay

class E extends B { // okay -- implements abstract method
    bar() { return 1; }
}

abstract class F extends B {
    abstract foo() : number;
    bar() { return 2; }
}

abstract class G {
    abstract qux(x : number) : string;
    abstract qux() : number;
    y : number;
    abstract quz(x : number, y : string) : boolean; // error -- declarations must be adjacent

    abstract nom(): boolean;
    nom(x : number): boolean; // error -- use of modifier abstract must match on all overloads.
}

class H { // error -- not declared abstract
    abstract baz() : number;
}