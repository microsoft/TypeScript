//// [tests/cases/compiler/jsFileCompilationWithMapFileAsJsWithInlineSourceMap.ts] ////

//// [a.ts]

class c {
}

//// [b.js.map]
function foo() {
}

//// [b.js]
function bar() {
}

//// [a.js]
var c = (function () {
    function c() {
    }
    return c;
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImEudHMiXSwibmFtZXMiOlsiYyIsImMuY29uc3RydWN0b3IiXSwibWFwcGluZ3MiOiJBQUNBO0lBQUFBO0lBQ0FDLENBQUNBO0lBQURELFFBQUNBO0FBQURBLENBQUNBLEFBREQsSUFDQyJ9