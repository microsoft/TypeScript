//// [tests/cases/compiler/declFileTypeAnnotationUnionType.ts] ////

//// [declFileTypeAnnotationUnionType.ts]
class c {
    private p: string;
}
module m {
    export class c {
        private q: string;
    }
    export class g<T> {
        private r: string;
    }
}
class g<T> {
    private s: string;
}

// Just the name
var k: c | m.c = new c() || new m.c();
var l = new c() || new m.c();

var x: g<string> | m.g<number> |  (() => c) = new g<string>() ||  new m.g<number>() || (() => new c());
var y = new g<string>() || new m.g<number>() || (() => new c());

//// [declFileTypeAnnotationUnionType.js]
var c = /** @class */ (function () {
    function c() {
    }
    return c;
}());
var m;
(function (m) {
    var c = /** @class */ (function () {
        function c() {
        }
        return c;
    }());
    m.c = c;
    var g = /** @class */ (function () {
        function g() {
        }
        return g;
    }());
    m.g = g;
})(m || (m = {}));
var g = /** @class */ (function () {
    function g() {
    }
    return g;
}());
// Just the name
var k = new c() || new m.c();
var l = new c() || new m.c();
var x = new g() || new m.g() || (function () { return new c(); });
var y = new g() || new m.g() || (function () { return new c(); });


//// [declFileTypeAnnotationUnionType.d.ts]
declare class c {
    private p;
}
declare namespace m {
    class c {
        private q;
    }
    class g<T> {
        private r;
    }
}
declare class g<T> {
    private s;
}
declare var k: c | m.c;
declare var l: c | m.c;
declare var x: g<string> | m.g<number> | (() => c);
declare var y: g<string> | m.g<number> | (() => c);


!!!! File declFileTypeAnnotationUnionType.d.ts differs from original emit in noCheck emit
//// [declFileTypeAnnotationUnionType.d.ts]
===================================================================
--- Expected	The full check baseline
+++ Actual	with noCheck set
@@ -12,7 +12,7 @@
 declare class g<T> {
     private s;
 }
 declare var k: c | m.c;
-declare var l: c | m.c;
+declare var l: m.c | c;
 declare var x: g<string> | m.g<number> | (() => c);
 declare var y: g<string> | m.g<number> | (() => c);
