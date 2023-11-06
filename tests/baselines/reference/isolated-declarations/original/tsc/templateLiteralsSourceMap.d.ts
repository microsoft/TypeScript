//// [tests/cases/compiler/templateLiteralsSourceMap.ts] ////

//// [templateLiteralsSourceMap.ts]
const s = `a${0}b${1}c${2}`;


/// [Declarations] ////



//// [/.src/templateLiteralsSourceMap.d.ts]
declare const s = "a0b1c2";
