//// [optionalMethods.ts]

interface Foo {
    a: number;
    b?: number;
    f(): number;
    g?(): number;
}

function test1(x: Foo) {
    x.a;
    x.b;
    x.f;
    x.g;
    let f1 = x.f();
    let g1 = x.g && x.g();
    let g2 = x.g ? x.g() : 0;
}

class Bar {
    a: number;
    b?: number;
    f() {
        return 1;
    }
    g?(): number;  // Body of optional method can be omitted
    h?() {
        return 2;
    }
}

function test2(x: Bar) {
    x.a;
    x.b;
    x.f;
    x.g;
    let f1 = x.f();
    let g1 = x.g && x.g();
    let g2 = x.g ? x.g() : 0;
    let h1 = x.h && x.h();
    let h2 = x.h ? x.h() : 0;
}


//// [optionalMethods.js]
function test1(x) {
    x.a;
    x.b;
    x.f;
    x.g;
    var f1 = x.f();
    var g1 = x.g && x.g();
    var g2 = x.g ? x.g() : 0;
}
var Bar = (function () {
    function Bar() {
    }
    Bar.prototype.f = function () {
        return 1;
    };
    Bar.prototype.h = function () {
        return 2;
    };
    return Bar;
}());
function test2(x) {
    x.a;
    x.b;
    x.f;
    x.g;
    var f1 = x.f();
    var g1 = x.g && x.g();
    var g2 = x.g ? x.g() : 0;
    var h1 = x.h && x.h();
    var h2 = x.h ? x.h() : 0;
}
