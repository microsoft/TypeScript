/// <reference path="fourslash.ts" />

////class C {
////    foo;
////    ["bar"]: string;
////}

verify.navigationBarCount(3);
verify.navigationBarContains("C", "class");
verify.navigationBarChildItem("C", "[\"bar\"]", "property");
verify.navigationBarChildItem("C", "foo", "property");
