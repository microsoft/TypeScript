//// [tests/cases/compiler/contextualTyping38.ts] ////

//// [contextualTyping38.ts]
var foo = <{ (): number; }> function(a) { return a };

/// [Declarations] ////



//// [contextualTyping38.d.ts]
declare var foo: () => number;
