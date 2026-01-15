enum A { }
enum B { }
    
function foo(a: A);
function foo(b: B);
// should be ok
function foo(x: number) { 
}

class C { }
function foo1(a: A);
function foo1(c: C);
// should be ok
function foo1(x: number) { 
}
