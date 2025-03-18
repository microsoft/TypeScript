//// [tests/cases/compiler/raiseErrorOnParameterProperty.ts] ////

//// [raiseErrorOnParameterProperty.ts]
class C1 {
  constructor(public x: X) {
  }
}
var c1 = new C1(0);
 


//// [raiseErrorOnParameterProperty.js]
class C1 {
    x;
    constructor(x) {
        this.x = x;
    }
}
var c1 = new C1(0);
