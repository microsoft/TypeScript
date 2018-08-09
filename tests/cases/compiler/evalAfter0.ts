// @allowUnreachableCode: false
(0,eval)("10"); // fine: special case for eval

declare var eva;
(0,eva)("10"); // error: no side effect left of comma (suspect of missing method name or something)