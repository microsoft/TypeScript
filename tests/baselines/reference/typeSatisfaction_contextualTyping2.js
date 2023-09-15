//// [tests/cases/conformance/expressions/typeSatisfaction/typeSatisfaction_contextualTyping2.ts] ////

//// [typeSatisfaction_contextualTyping2.ts]
let obj: { f(s: string): void } & Record<string, unknown> = {
    f(s) { }, // "incorrect" implicit any on 's'
    g(s) { }
} satisfies { g(s: string): void } & Record<string, unknown>;

// This needs to not crash (outer node is not expression)
({ f(x) { } }) satisfies { f(s: string): void };


//// [typeSatisfaction_contextualTyping2.js]
"use strict";
var obj = {
    f: function (s) { }, // "incorrect" implicit any on 's'
    g: function (s) { }
};
// This needs to not crash (outer node is not expression)
({ f: function (x) { } });
