//// [tests/cases/compiler/declFileObjectLiteralWithOnlySetter.ts] ////

//// [declFileObjectLiteralWithOnlySetter.ts]
function /*1*/makePoint(x: number) { 
    return {
        b: 10,
        set x(a: number) { this.b = a; }
    };
};
var /*3*/point = makePoint(2);
point./*2*/x = 30;

//// [declFileObjectLiteralWithOnlySetter.js]
function makePoint(x) {
    return {
        b: 10,
        set x(a) { this.b = a; }
    };
}
;
var /*3*/ point = makePoint(2);
point. /*2*/x = 30;


//// [declFileObjectLiteralWithOnlySetter.d.ts]
declare function makePoint(x: number): {
    b: number;
    x: number;
};
declare var /*3*/ point: {
    b: number;
    x: number;
};
