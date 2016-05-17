/// <reference path="fourslash.ts" />

////console.log(class A { b() {} });

debug.printNavigationBar();
verify.navigationBarCount(2);
verify.navigationBarContains("A", "class");
verify.navigationBarChildItem("A", "b", "method");
