//// [tests/cases/conformance/es7/trailingCommasInGetter.ts] ////

//// [trailingCommasInGetter.ts]
class X {
    get x(,) { return 0; }
}


//// [trailingCommasInGetter.js]
class X {
    get x() { return 0; }
}
