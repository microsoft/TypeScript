//// [tests/cases/compiler/assignmentStricterConstraints.ts] ////

//// [assignmentStricterConstraints.ts]
var f = function <T, S extends T>(x: T, y: S): void {
    x = y
}

var g = function <T, S>(x: T, y: S): void { }

g = f
g(1, "")


//// [assignmentStricterConstraints.js]
var f = function (x, y) {
    x = y;
};
var g = function (x, y) { };
g = f;
g(1, "");
