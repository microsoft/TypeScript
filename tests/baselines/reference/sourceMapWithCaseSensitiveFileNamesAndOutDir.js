//// [tests/cases/compiler/sourceMapWithCaseSensitiveFileNamesAndOutDir.ts] ////

//// [app.ts]
// Note in the out result we are using same folder name only different in casing
// Since this is case sensitive, the folders are different and hence the relative paths in sourcemap shouldn't be just app.ts or app2.ts
class c {
}

//// [app2.ts]
class d {
}

//// [app.js]
// Note in the out result we are using same folder name only different in casing
// Since this is case sensitive, the folders are different and hence the relative paths in sourcemap shouldn't be just app.ts or app2.ts
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
//# sourceMappingURL=app.js.map
//// [app2.js]
var d = /** @class */ (function () {
    function d() {
    }
    return d;
}());
//# sourceMappingURL=app2.js.map