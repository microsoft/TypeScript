//// [tests/cases/compiler/jsExpandoAssignmentElementAccess.ts] ////

//// [repro.js]
var x = {};
x['if'] = 1;
x['else'] = 1;




//// [repro.d.ts]
declare var x: {
    if: number;
    else: number;
};
