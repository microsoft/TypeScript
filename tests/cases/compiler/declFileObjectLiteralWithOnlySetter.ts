// @declaration: true
// @target: es5

function /*1*/makePoint(x: number) { 
    return {
        b: 10,
        set x(a: number) { this.b = a; }
    };
};
var /*3*/point = makePoint(2);
point./*2*/x = 30;