//// [tests/cases/compiler/indexWithoutParamType2.ts] ////

//// [indexWithoutParamType2.ts]
class C {
    // Used to be indexer, now it is a computed property
    [x]: string
}

//// [indexWithoutParamType2.js]
class C {
    [x];
}
