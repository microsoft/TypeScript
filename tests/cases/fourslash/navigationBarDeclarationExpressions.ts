/// <reference path="fourslash.ts" />

////console.log(console.log(class Y {}, class X {}), console.log(class B {}, class A {}));
////console.log(class Cls { meth() {} });

verify.navigationBarCount(6);
verify.navigationBarIndex("A", 0);
verify.navigationBarIndex("B", 1);
verify.navigationBarIndex("Cls", 2);
verify.navigationBarIndex("X", 3);
verify.navigationBarIndex("Y", 4);

verify.navigationBarContains("Cls", "class");
verify.navigationBarChildItem("Cls", "meth", "method");
