var x: {};

function foo() {
    this.x = 1;
}

class C1 extends undefined { }
class C2 extends true { }
class C3 extends false { }
class C4 extends 42 { }
class C5 extends "hello" { }
class C6 extends x { }
class C7 extends foo { }
