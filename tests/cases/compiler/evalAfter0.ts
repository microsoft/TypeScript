(0,eval)("10"); // fine: special case for eval

(0,alert)("10"); // error: no side effect left of comma (suspect of missing method name or something)