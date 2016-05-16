/// <reference path='fourslash.ts'/> 
////'use strict'
////var foo, {}
////var bar, []
////let foo1, {a, b}
////const bar1, [c, d]
////var {e, x: [f, g]} = {a:1, x:[]};

verify.navigationBarCount(12); // global (1) + variable declarations (4) + binding patterns (7)
verify.navigationBarContains("foo", "var");
verify.navigationBarContains("bar", "var");
verify.navigationBarContains("foo1", "let")
verify.navigationBarContains("a", "let");
verify.navigationBarContains("b", "let");
verify.navigationBarContains("bar1", "const");
verify.navigationBarContains("c", "const");
verify.navigationBarContains("d", "const");
verify.navigationBarContains("e", "var");
verify.navigationBarContains("f", "var");
verify.navigationBarContains("g", "var");

