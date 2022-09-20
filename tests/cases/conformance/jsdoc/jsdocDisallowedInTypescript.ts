// @strict: true

// @filename: /a.ts
// grammar error from checker
var ara: Array.<number> = [1,2,3];

function f1(y: Array.<number>) {
    return y[0];
}
function hof(ctor: function(new: number, string)) {
    return new ctor('hi');
}
function hof2(f: function(this: number, string): string) {
    return f(12, 'hullo');
}
var whatevs: * = 1001;
var ques: ? = 'what';
var g: function(number, number): number = (n,m) => n + m;
var anys: Array<*>;

// @filename: /b.ts
function f2(x: ?number) {
    return x;
}

var most: !string = 'definite';
var postfixdef: number! = 101;
var postfixopt: number? = undefined;

var nns: Array<?number>;
var dns: Array<!number>;
