//// [tests/cases/compiler/typeParameterConstraints1.ts] ////

//// [typeParameterConstraints1.ts]
function foo1<T extends any>(test: T) { }
function foo2<T extends number>(test: T) { }
function foo3<T extends string>(test: T) { }
function foo4<T extends Date>(test: T) { } // valid
function foo5<T extends RegExp>(test: T) { } // valid
function foo6<T extends hm>(test: T) { }
function foo7<T extends Object>(test: T) { } // valid
function foo8<T extends "">(test: T) { }
function foo9<T extends 1 > (test: T) { }
function foo10<T extends (1)> (test: T) { }
function foo11<T extends null> (test: T) { }
function foo12<T extends undefined>(test: T) { }
function foo13<T extends void>(test: T) { }

//// [typeParameterConstraints1.js]
function foo1(test) { }
function foo2(test) { }
function foo3(test) { }
function foo4(test) { } // valid
function foo5(test) { } // valid
function foo6(test) { }
function foo7(test) { } // valid
function foo8(test) { }
function foo9(test) { }
function foo10(test) { }
function foo11(test) { }
function foo12(test) { }
function foo13(test) { }
