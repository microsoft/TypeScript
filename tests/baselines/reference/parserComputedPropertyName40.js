//// [parserComputedPropertyName40.ts]
class C {
    [a ? "" : ""]() {}
}

//// [parserComputedPropertyName40.js]
class C {
    [a ? "" : ""]() { }
}
