//// [tests/cases/compiler/unaryOperatorsInStrictMode.ts] ////

//// [unaryOperatorsInStrictMode.ts]
"use strict"

++eval;
--eval;
++arguments;
--arguments;
eval++;
eval--;
arguments++;
arguments--;


//// [unaryOperatorsInStrictMode.js]
"use strict";
++eval;
--eval;
++arguments;
--arguments;
eval++;
eval--;
arguments++;
arguments--;
