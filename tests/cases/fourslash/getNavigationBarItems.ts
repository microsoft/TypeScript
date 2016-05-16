/// <reference path="fourslash.ts" />

////class C {
////    foo;
////    ["bar"]: string;
////}

verify.navigationBarCount(1);
verify.navigationBarItem("C", "class");
verify.navigationBarChildItem("C", "[\"bar\"]", "property");
verify.navigationBarChildItem("C", "foo", "property");
