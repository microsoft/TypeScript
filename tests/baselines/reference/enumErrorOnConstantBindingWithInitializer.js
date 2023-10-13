//// [tests/cases/conformance/enums/enumErrorOnConstantBindingWithInitializer.ts] ////

//// [enumErrorOnConstantBindingWithInitializer.ts]
type Thing = {
  value?: string | number;
};

declare const thing: Thing;
const { value = "123" } = thing;

enum E {
  test = value,
}


//// [enumErrorOnConstantBindingWithInitializer.js]
"use strict";
var _a = thing.value, value = _a === void 0 ? "123" : _a;
var E;
(function (E) {
    E[E["test"] = value] = "test";
})(E || (E = {}));
