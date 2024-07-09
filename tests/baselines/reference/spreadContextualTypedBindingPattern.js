//// [tests/cases/conformance/types/spread/spreadContextualTypedBindingPattern.ts] ////

//// [spreadContextualTypedBindingPattern.ts]
// #18308
interface Person {
  naam: string,
  age: number
}

declare const bob: Person
declare const alice: Person

// [ts] Initializer provides no value for this binding element and the binding element has no default value.
const { naam, age } = {...bob, ...alice}


//// [spreadContextualTypedBindingPattern.js]
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
// [ts] Initializer provides no value for this binding element and the binding element has no default value.
var _a = __assign(__assign({}, bob), alice), naam = _a.naam, age = _a.age;
