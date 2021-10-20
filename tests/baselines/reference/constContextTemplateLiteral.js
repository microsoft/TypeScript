//// [constContextTemplateLiteral.ts]
interface Person {
    id: number;
    name: string;
}

declare function key(): `person-${number}`
/* This only happens if index type is a template literal type */
const persons: Record<`person-${Person["id"]}`, { a: any }> = {
    ...{},
    [`person-${1}`]: { b: "something" }, // ok, error
    [`person-${1}` as const]: { b: "something" }, // ok, error
    [key()]: { b: "something" }, // still no error
}


//// [constContextTemplateLiteral.js]
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _a;
/* This only happens if index type is a template literal type */
var persons = __assign({}, (_a = {}, _a["person-".concat(1)] = { b: "something" }, _a["person-".concat(1)] = { b: "something" }, _a[key()] = { b: "something" }, _a));
