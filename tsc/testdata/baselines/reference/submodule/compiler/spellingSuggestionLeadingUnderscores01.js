//// [tests/cases/compiler/spellingSuggestionLeadingUnderscores01.ts] ////

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.a.___foo;
exports.b = {
    ___foo: 100,
};
