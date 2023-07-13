//// [tests/cases/conformance/parser/ecmascript5/AutomaticSemicolonInsertion/parserAutomaticSemicolonInsertion1.ts] ////

//// [parserAutomaticSemicolonInsertion1.ts]
interface I {
    (): void;
}
 
var i: I;
var o: Object;
o = i;
i = o;
 
var a: {
    (): void
}
o = a;
a = o;


//// [parserAutomaticSemicolonInsertion1.js]
var i;
var o;
o = i;
i = o;
var a;
o = a;
a = o;
