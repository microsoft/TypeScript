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
    constructor(z) {
        this.z = z;
    }
}
class Y {
    constructor(z) {
        this.z = z;
    }
}
class Z {
}
var c1 = new X(3);
var c2 = new Y(5);
var c3 = new Z();
c1 = c2 = c3; // Should be error
