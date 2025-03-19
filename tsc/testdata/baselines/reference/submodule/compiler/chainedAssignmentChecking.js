//// [tests/cases/compiler/chainedAssignmentChecking.ts] ////

//// [chainedAssignmentChecking.ts]
class X {
  constructor(public z) { }
  a: number;
}

class Y {
  constructor(public z) { }
  a: number;
  b: string;
}

class Z {
  z: any;
  c: string;
}

var c1 = new X(3);
var c2 = new Y(5);
var c3 = new Z();

c1 = c2 = c3; // Should be error


//// [chainedAssignmentChecking.js]
class X {
    z;
    constructor(z) {
        this.z = z;
    }
    a;
}
class Y {
    z;
    constructor(z) {
        this.z = z;
    }
    a;
    b;
}
class Z {
    z;
    c;
}
var c1 = new X(3);
var c2 = new Y(5);
var c3 = new Z();
c1 = c2 = c3; // Should be error
