//// [tests/cases/compiler/optionalChainingArrowFunctionCommentEs2018.ts] ////

//// [optionalChainingArrowFunctionCommentEs2018.ts]
const thing = { nested: { condition: true } };

const wat = () =>
    // explanatory comment
    thing?.nested?.condition ? "pass" : "fail";

const watInline = () => /* inline explanatory comment */ thing?.nested?.condition ? "pass" : "fail";

const watInlineMultiline = () => /* inline
explanatory comment */ thing?.nested?.condition ? "pass" : "fail";

const watInlineThenLeading = () => /* inline explanatory comment */
    // leading explanatory comment
    thing?.nested?.condition ? "pass" : "fail";

declare const o: { a?: number[] };

export const f = () =>
    // comment
    o.a?.length;


//// [optionalChainingArrowFunctionCommentEs2018.js]
const thing = { nested: { condition: true } };
const wat = () => { var _a; 
// explanatory comment
return ((_a = thing === null || thing === void 0 ? void 0 : thing.nested) === null || _a === void 0 ? void 0 : _a.condition) ? "pass" : "fail"; };
const watInline = () => /* inline explanatory comment */ { var _a; /* inline explanatory comment */ return ((_a = thing === null || thing === void 0 ? void 0 : thing.nested) === null || _a === void 0 ? void 0 : _a.condition) ? "pass" : "fail"; };
const watInlineMultiline = () => /* inline
explanatory comment */ { var _a; /* inline
explanatory comment */ return ((_a = thing === null || thing === void 0 ? void 0 : thing.nested) === null || _a === void 0 ? void 0 : _a.condition) ? "pass" : "fail"; };
const watInlineThenLeading = () => /* inline explanatory comment */ { var _a; /* inline explanatory comment */ 
// leading explanatory comment
return ((_a = thing === null || thing === void 0 ? void 0 : thing.nested) === null || _a === void 0 ? void 0 : _a.condition) ? "pass" : "fail"; };
export const f = () => { var _a; 
// comment
return (_a = o.a) === null || _a === void 0 ? void 0 : _a.length; };
