//// [tests/cases/conformance/statements/throwStatements/invalidThrowStatement.ts] ////

//// [invalidThrowStatement.ts]
throw; 

export throw null;


//// [invalidThrowStatement.js]
"use strict";
throw ;
throw null;
