//// [tests/cases/compiler/parseErrorDoubleCommaInCall.ts] ////

//// [parseErrorDoubleCommaInCall.ts]
Boolean({
    x: 0,,
});


//// [parseErrorDoubleCommaInCall.js]
Boolean({
    x: 0,
});
