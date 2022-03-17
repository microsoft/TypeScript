//// [satisfiesContextualType.ts]
let obj: { f(s: string): void } & Record<string, unknown> = {
    f(s) { }, // "incorrect" implicit any on 's'
    g(s) { }
} satisfies { g(s: string): void } & Record<string, unknown>;


//// [satisfiesContextualType.js]
"use strict";
var obj = {
    f: function (s) { },
    g: function (s) { }
};
