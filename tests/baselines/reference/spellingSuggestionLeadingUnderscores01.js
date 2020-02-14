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
    ___foo: 100,
}



//// [spellingSuggestionLeadingUnderscores01.js]
"use strict";
exports.__esModule = true;
exports.a.___foo;
// @filename def.ts
exports.b = undefined;
exports.b = {
    ___foo: 100
};
