//// [tests/cases/compiler/contextualTyping15.ts] ////

//// [contextualTyping15.ts]
class foo { public bar: { (): number; (i: number): number; } = function() { return 1 }; }

//// [contextualTyping15.js]
class foo {
    bar = function () { return 1; };
}
