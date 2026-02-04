//// [tests/cases/compiler/templateLiteralsSourceMap.ts] ////

//// [templateLiteralsSourceMap.ts]
const s = `a${0}b${1}c${2}`;


//// [templateLiteralsSourceMap.js]
"use strict";
const s = `a${0}b${1}c${2}`;
//# sourceMappingURL=templateLiteralsSourceMap.js.map