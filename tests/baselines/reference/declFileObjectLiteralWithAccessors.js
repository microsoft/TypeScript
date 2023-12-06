//// [tests/cases/compiler/declFileObjectLiteralWithAccessors.ts] ////

//// [declFileObjectLiteralWithAccessors.ts]
function /*1*/makePoint(x: number) { 
    return {
        b: 10,
        get x() { return x; },
        set x(a: number) { this.b = a; }
    };
};
var /*4*/point = makePoint(2);
var /*2*/x = point.x;
point./*3*/x = 30;

//// [declFileObjectLiteralWithAccessors.js]
function makePoint(x) {
    return {
        b: 10,
        get x() { return x; },
        set x(a) { this.b = a; }
    };
}
;
var /*4*/ point = makePoint(2);
var /*2*/ x = point.x;
point. /*3*/x = 30;


//// [declFileObjectLiteralWithAccessors.d.ts]
declare function makePoint(x: number): {
    b: number;
    x: number;
};
declare var /*4*/ point: {
    b: number;
    x: number;
};
declare var /*2*/ x: number;
