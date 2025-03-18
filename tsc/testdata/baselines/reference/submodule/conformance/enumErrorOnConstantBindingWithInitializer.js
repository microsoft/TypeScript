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
const { value = "123" } = thing;
var E;
(function (E) {
    E["test"] = value;
    if (typeof E.test !== "string") E[E.test] = "test";
})(E || (E = {}));
