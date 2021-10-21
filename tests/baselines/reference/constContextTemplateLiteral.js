//// [constContextTemplateLiteral.ts]
type Person = { id: number }
const persons: Record<string, { a: any }> = {
    [`person-${1}`]: { b: "something" }, // ok, error
}


//// [constContextTemplateLiteral.js]
var _a;
var persons = (_a = {},
    _a["person-".concat(1)] = { b: "something" },
    _a);
