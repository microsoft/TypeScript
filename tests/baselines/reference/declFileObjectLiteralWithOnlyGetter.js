//// [tests/cases/compiler/declFileObjectLiteralWithOnlyGetter.ts] ////

//// [declFileObjectLiteralWithOnlyGetter.ts]
function /*1*/makePoint(x: number) { 
    return {
        get x() { return x; },
    };
};
var /*4*/point = makePoint(2);
var /*2*/x = point./*3*/x;


//// [declFileObjectLiteralWithOnlyGetter.js]
function makePoint(x) {
    return {
        get x() { return x; },
    };
}
;
var /*4*/ point = makePoint(2);
var /*2*/ x = point. /*3*/x;


//// [declFileObjectLiteralWithOnlyGetter.d.ts]
declare function makePoint(x: number): {
    get x(): number;
};
declare var /*4*/ point: {
    get x(): number;
};
declare var /*2*/ x: number;
