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
    readonly x: number;
};
declare var point: {
    readonly x: number;
};
declare var x: number;
