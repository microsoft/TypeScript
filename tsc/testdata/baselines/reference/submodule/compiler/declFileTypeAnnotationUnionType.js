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
class c {
    p;
}
var m;
(function (m) {
    class c {
        q;
    }
    m.c = c;
    class g {
        r;
    }
    m.g = g;
})(m || (m = {}));
class g {
    s;
}
// Just the name
var k = new c() || new m.c();
var l = new c() || new m.c();
var x = new g() || new m.g() || (() => new c());
var y = new g() || new m.g() || (() => new c());


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
declare var y: m.g<number> | g<string> | (() => c);
