//// [tests/cases/compiler/enumComputedStringSuggestion.ts] ////

//// [enumComputedStringSuggestion.ts]
enum Test {
  ["Hello"] = 1,
}


//// [enumComputedStringSuggestion.js]
var Test;
(function (Test) {
    Test[Test["Hello"] = 1] = "Hello";
})(Test || (Test = {}));
