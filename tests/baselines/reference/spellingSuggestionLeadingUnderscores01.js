//// [spellingSuggestionLeadingUnderscores01.ts]
// @filename abc.ts
export declare let a: {
    __foo: 10,
}

a.___foo

// @filename def.ts
export let b: {
    __foo: number
}

b = {
    __foo: 100,
}



//// [spellingSuggestionLeadingUnderscores01.js]
"use strict";
exports.__esModule = true;
exports.a.___foo;
exports.b = {
    __foo: 100
};
