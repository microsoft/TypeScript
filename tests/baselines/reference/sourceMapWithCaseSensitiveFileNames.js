//// [tests/cases/compiler/sourceMapWithCaseSensitiveFileNames.ts] ////

//// [app.ts]
// Note in the out result we are using same folder name only different in casing
// Since this is case sensitive, the folders are different and hence the relative paths in sourcemap shouldn't be just app.ts or app2.ts
class c {
}

//// [app2.ts]
class d {
}

//// [fooResult.js]
// Note in the out result we are using same folder name only different in casing
// Since this is case sensitive, the folders are different and hence the relative paths in sourcemap shouldn't be just app.ts or app2.ts
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
var d = /** @class */ (function () {
    function d() {
    }
    return d;
}());
//# sourceMappingURL=fooResult.js.map