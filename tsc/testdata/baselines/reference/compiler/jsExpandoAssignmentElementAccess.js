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
declare namespace x {
    var _a: number;
    export { _a as if };
}
declare namespace x {
    var _b: number;
    export { _b as else };
}


//// [DtsFileErrors]


repro.d.ts(1,13): error TS2300: Duplicate identifier 'x'.
repro.d.ts(5,19): error TS2300: Duplicate identifier 'x'.
repro.d.ts(9,19): error TS2300: Duplicate identifier 'x'.


==== repro.d.ts (3 errors) ====
    declare var x: {
                ~
!!! error TS2300: Duplicate identifier 'x'.
        if: number;
        else: number;
    };
    declare namespace x {
                      ~
!!! error TS2300: Duplicate identifier 'x'.
        var _a: number;
        export { _a as if };
    }
    declare namespace x {
                      ~
!!! error TS2300: Duplicate identifier 'x'.
        var _b: number;
        export { _b as else };
    }
    