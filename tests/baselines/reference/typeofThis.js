//// [tests/cases/conformance/types/specifyingTypes/typeQueries/typeofThis.ts] ////

//// [typeofThis.ts]
class Test {
    data = {};
    constructor() {
        var copy: typeof this.data = {};
    }
}

class Test1 {
    data = { foo: '' };
    ['this'] = '';
    constructor() {
        var copy: typeof this.data = { foo: '' };
        var foo: typeof this.data.foo = '';

        var self: typeof this = this;
        self.data;

        var str: typeof this.this = '';
    }
}


function Test2() {
    let x: typeof this.no = 1;
}

function Test3(this: { no: number }) {
    let x: typeof this.no = 1;
}

function Test4(this: { no: number } | undefined) {
    let x: typeof this.no = 1;
}

class Test5 {
    no = 1;

    f = () => {
        // should not capture this.
        let x: typeof this.no = 1;
    }
}

namespace Test6 {
    export let f = () => {
        let x: typeof this.no = 1;
    }
}

module Test7 {
    export let f = () => {
        let x: typeof this.no = 1;
    }
}

const Test8 = () => {
    let x: typeof this.no = 1;
}

class Test9 {
    no = 0;
    this = 0;

    f() {
        if (this instanceof Test9D1) {
            const d1: typeof this = this;
            d1.f1();
        }

        if (this instanceof Test9D2) {
            const d2: typeof this = this;
            d2.f2();
        }
    }

    g() {
        if (this.no === 1) {
            const no: typeof this.no = this.no;
        }

        if (this.this === 1) {
            const no: typeof this.this = this.this;
        }
    }
}

class Test9D1 {
    f1() {}
}

class Test9D2 {
    f2() {}
}

class Test10 {
    a?: { b?: string }

    foo() {
        let a: typeof this.a = undefined as any;
        if (this.a) {
            let a: typeof this.a = undefined as any;    // should narrow to { b?: string }
            let b: typeof this.a.b = undefined as any;

            if (this.a.b) {
                let b: typeof this.a.b = undefined as any;   // should narrow to string
            }
        }
    }
}

class Test11 {
    this?: { x?: string };
    
    foo() {
        const o = this;
        let bar: typeof o.this = {};

        if (o.this && o.this.x) {
            let y: string = o.this.x;   // should narrow to string
        }
    }
}

class Tests12 {
    test1() { // OK
        type Test = typeof this;
    }

    test2() { // OK
        for (;;) {}
        type Test = typeof this;
    }

    test3() { // expected no compile errors
        for (const dummy in []) {}
        type Test = typeof this;
    }

    test4() { // expected no compile errors
        for (const dummy of []) {}
        type Test = typeof this;
    }
}

//// [typeofThis.js]
"use strict";
var Test = /** @class */ (function () {
    function Test() {
        this.data = {};
        var copy = {};
    }
    return Test;
}());
var Test1 = /** @class */ (function () {
    function Test1() {
        this.data = { foo: '' };
        this['this'] = '';
        var copy = { foo: '' };
        var foo = '';
        var self = this;
        self.data;
        var str = '';
    }
    return Test1;
}());
function Test2() {
    var x = 1;
}
function Test3() {
    var x = 1;
}
function Test4() {
    var x = 1;
}
var Test5 = /** @class */ (function () {
    function Test5() {
        this.no = 1;
        this.f = function () {
            // should not capture this.
            var x = 1;
        };
    }
    return Test5;
}());
var Test6;
(function (Test6) {
    Test6.f = function () {
        var x = 1;
    };
})(Test6 || (Test6 = {}));
var Test7;
(function (Test7) {
    Test7.f = function () {
        var x = 1;
    };
})(Test7 || (Test7 = {}));
var Test8 = function () {
    var x = 1;
};
var Test9 = /** @class */ (function () {
    function Test9() {
        this.no = 0;
        this.this = 0;
    }
    Test9.prototype.f = function () {
        if (this instanceof Test9D1) {
            var d1 = this;
            d1.f1();
        }
        if (this instanceof Test9D2) {
            var d2 = this;
            d2.f2();
        }
    };
    Test9.prototype.g = function () {
        if (this.no === 1) {
            var no = this.no;
        }
        if (this.this === 1) {
            var no = this.this;
        }
    };
    return Test9;
}());
var Test9D1 = /** @class */ (function () {
    function Test9D1() {
    }
    Test9D1.prototype.f1 = function () { };
    return Test9D1;
}());
var Test9D2 = /** @class */ (function () {
    function Test9D2() {
    }
    Test9D2.prototype.f2 = function () { };
    return Test9D2;
}());
var Test10 = /** @class */ (function () {
    function Test10() {
    }
    Test10.prototype.foo = function () {
        var a = undefined;
        if (this.a) {
            var a_1 = undefined; // should narrow to { b?: string }
            var b = undefined;
            if (this.a.b) {
                var b_1 = undefined; // should narrow to string
            }
        }
    };
    return Test10;
}());
var Test11 = /** @class */ (function () {
    function Test11() {
    }
    Test11.prototype.foo = function () {
        var o = this;
        var bar = {};
        if (o.this && o.this.x) {
            var y = o.this.x; // should narrow to string
        }
    };
    return Test11;
}());
var Tests12 = /** @class */ (function () {
    function Tests12() {
    }
    Tests12.prototype.test1 = function () {
    };
    Tests12.prototype.test2 = function () {
        for (;;) { }
    };
    Tests12.prototype.test3 = function () {
        for (var dummy in []) { }
    };
    Tests12.prototype.test4 = function () {
        for (var _i = 0, _a = []; _i < _a.length; _i++) {
            var dummy = _a[_i];
        }
    };
    return Tests12;
}());
