//// [tests/cases/compiler/unusedLocalsAndObjectSpread2.ts] ////

//// [unusedLocalsAndObjectSpread2.ts]
declare let props: any;
const {
    children, // here!
    active: _a, // here!
  ...rest
} = props;

function foo() {
    const {
        children,
        active: _a,
        ...rest
    } = props;
}

export const asdf = 123;

//// [unusedLocalsAndObjectSpread2.js]
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const { children, // here!
active: _a } = props, // here!
rest = __rest(props, ["children", "active"]);
function foo() {
    const { children, active: _a } = props, rest = __rest(props, ["children", "active"]);
}
export const asdf = 123;
