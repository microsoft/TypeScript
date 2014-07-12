class X{
      name: string;
}

class Y{
      name: string;
}

class X_1 {
    private name: string;
}

class Y_1 {
    private name: string;
}

function foo(arg: X){}
 
var a = new Y();
var b = new X();
 
a = b; // ok
foo(a); // ok

var a2 = new Y_1();
var b2 = new X_1();

function foo2(arg: X_1) { }

a2 = b2; // should error
foo2(a2); // should error
