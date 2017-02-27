//// [evalAfter0.ts]
(0,eval)("10"); // fine: special case for eval

declare var eva;
(0,eva)("10"); // error: no side effect left of comma (suspect of missing method name or something)

//// [evalAfter0.js]
(0, eval)("10"); // fine: special case for eval
(0, eva)("10"); // error: no side effect left of comma (suspect of missing method name or something)
