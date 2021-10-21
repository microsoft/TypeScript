//// [constContextTemplateLiteral.ts]
interface Person {
    id: number;
    name: string;
}

declare function key(): `person-${number}`
/* This only happens if index type is a template literal type */
const persons: Record<`person-${Person["id"]}`, { a: any }> = {
    [`person-${1}`]: { b: "something" }, // ok, error
    [`person-${1}` as const]: { b: "something" }, // ok, error
    [key()]: { b: "something" }, // still no error, it's not a literal
}


//// [constContextTemplateLiteral.js]
var _a;
/* This only happens if index type is a template literal type */
var persons = (_a = {},
    _a["person-".concat(1)] = { b: "something" },
    _a["person-".concat(1)] = { b: "something" },
    _a[key()] = { b: "something" },
    _a);
