/// <reference path="fourslash.ts"/>

////type T = number | string;

verify.navigationBarCount(3);
verify.navigationBarContains("T", "type");
verify.navigationBarChildItem("<global>", "T", "type");
