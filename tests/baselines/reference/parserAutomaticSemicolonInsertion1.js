//// [tests/cases/conformance/parser/ecmascript5/AutomaticSemicolonInsertion/parserAutomaticSemicolonInsertion1.ts] ////

//// [parserAutomaticSemicolonInsertion1.ts]
interface I {
    (): void;
}
 
declare var i: I;
var o: Object;
o = i;
i = o;
 
declare var a: {
    (): void
}
o = a;
a = o;


//// [parserAutomaticSemicolonInsertion1.js]
var o;
o = i;
i = o;
o = a;
a = o;
