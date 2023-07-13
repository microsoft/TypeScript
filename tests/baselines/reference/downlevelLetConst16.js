//// [tests/cases/compiler/downlevelLetConst16.ts] ////

//// [downlevelLetConst16.ts]
'use strict'

declare function use(a: any);

var x = 10;
var y;
var z;
use(x);
use(y);
use(z);
function foo1() {
    let x = 1;
    use(x);
    let [y] = [1];
    use(y);
    let {a: z} = {a: 1};
    use(z);
}

function foo2() {
    {
        let x = 1;
        use(x);
        let [y] = [1];
        use(y);
        let {a: z} = { a: 1 };
        use(z);
    }
    use(x);
}

class A {
    m1() {
        let x = 1;
        use(x);
        let [y] = [1];
        use(y);
        let {a: z} = { a: 1 };
        use(z);
    }
    m2() {
        {
            let x = 1;
            use(x);
            let [y] = [1];
            use(y);
            let {a: z} = { a: 1 };
            use(z);
        }
        use(x);
    }

}

class B {
    m1() {
        const x = 1;
        use(x);
        const [y] = [1];
        use(y);
        const {a: z} = { a: 1 };
        use(z);

    }
    m2() {
        {
            const x = 1;
            use(x);
            const [y] = [1];
            use(y);
            const {a: z} = { a: 1 };
            use(z);

        }
        use(x);
    }
}

function bar1() {
    const x = 1;
    use(x);
    const [y] = [1];
    use(y);
    const {a: z} = { a: 1 };
    use(z);
}

function bar2() {
    {
        const x = 1;
        use(x);
        const [y] = [1];
        use(y);
        const {a: z} = { a: 1 };
        use(z);

    }
    use(x);
}

module M1 {
    let x = 1;
    use(x);
    let [y] = [1];
    use(y);
    let {a: z} = { a: 1 };
    use(z);
}

module M2 {
    {
        let x = 1;
        use(x);
        let [y] = [1];
        use(y);
        let {a: z} = { a: 1 };
        use(z);
    }
    use(x);
}

module M3 {
    const x = 1;
    use(x);
    const [y] = [1];
    use(y);
    const {a: z} = { a: 1 };
    use(z);

}

module M4 {
    {
        const x = 1;
        use(x);
        const [y] = [1];
        use(y);
        const {a: z} = { a: 1 };
        use(z);

    }
    use(x);
    use(y);
    use(z);
}

function foo3() {
    for (let x; ;) {
        use(x);
    }
    for (let [y] = []; ;) {
        use(y);
    }
    for (let {a: z} = {a: 1}; ;) {
        use(z);
    }
    use(x);
}

function foo4() {
    for (const x = 1; ;) {
        use(x);
    }
    for (const [y] = []; ;) {
        use(y);
    }
    for (const {a: z} = { a: 1 }; ;) {
        use(z);
    }
    use(x);
}

function foo5() {
    for (let x in []) {
        use(x);
    }
    use(x);
}

function foo6() {
    for (const x in []) {
        use(x);
    }
    use(x);
}

function foo7() {
    for (let x of []) {
        use(x);
    }
    use(x);
}

function foo8() {
    for (let [x] of []) {
        use(x);
    }
    use(x);
}

function foo9() {
    for (let {a: x} of []) {
        use(x);
    }
    use(x);
}

function foo10() {
    for (const x of []) {
        use(x);
    }
    use(x);
}

function foo11() {
    for (const [x] of []) {
        use(x);
    }
    use(x);
}

function foo12() {
    for (const {a: x} of []) {
        use(x);
    }
    use(x);
}

//// [downlevelLetConst16.js]
'use strict';
var x = 10;
var y;
var z;
use(x);
use(y);
use(z);
function foo1() {
    var x = 1;
    use(x);
    var y = [1][0];
    use(y);
    var z = { a: 1 }.a;
    use(z);
}
function foo2() {
    {
        var x_1 = 1;
        use(x_1);
        var y_1 = [1][0];
        use(y_1);
        var z_1 = { a: 1 }.a;
        use(z_1);
    }
    use(x);
}
var A = /** @class */ (function () {
    function A() {
    }
    A.prototype.m1 = function () {
        var x = 1;
        use(x);
        var y = [1][0];
        use(y);
        var z = { a: 1 }.a;
        use(z);
    };
    A.prototype.m2 = function () {
        {
            var x_2 = 1;
            use(x_2);
            var y_2 = [1][0];
            use(y_2);
            var z_2 = { a: 1 }.a;
            use(z_2);
        }
        use(x);
    };
    return A;
}());
var B = /** @class */ (function () {
    function B() {
    }
    B.prototype.m1 = function () {
        var x = 1;
        use(x);
        var y = [1][0];
        use(y);
        var z = { a: 1 }.a;
        use(z);
    };
    B.prototype.m2 = function () {
        {
            var x_3 = 1;
            use(x_3);
            var y_3 = [1][0];
            use(y_3);
            var z_3 = { a: 1 }.a;
            use(z_3);
        }
        use(x);
    };
    return B;
}());
function bar1() {
    var x = 1;
    use(x);
    var y = [1][0];
    use(y);
    var z = { a: 1 }.a;
    use(z);
}
function bar2() {
    {
        var x_4 = 1;
        use(x_4);
        var y_4 = [1][0];
        use(y_4);
        var z_4 = { a: 1 }.a;
        use(z_4);
    }
    use(x);
}
var M1;
(function (M1) {
    var x = 1;
    use(x);
    var y = [1][0];
    use(y);
    var z = { a: 1 }.a;
    use(z);
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    {
        var x_5 = 1;
        use(x_5);
        var y_5 = [1][0];
        use(y_5);
        var z_5 = { a: 1 }.a;
        use(z_5);
    }
    use(x);
})(M2 || (M2 = {}));
var M3;
(function (M3) {
    var x = 1;
    use(x);
    var y = [1][0];
    use(y);
    var z = { a: 1 }.a;
    use(z);
})(M3 || (M3 = {}));
var M4;
(function (M4) {
    {
        var x_6 = 1;
        use(x_6);
        var y_6 = [1][0];
        use(y_6);
        var z_6 = { a: 1 }.a;
        use(z_6);
    }
    use(x);
    use(y);
    use(z);
})(M4 || (M4 = {}));
function foo3() {
    for (var x_7;;) {
        use(x_7);
    }
    for (var y_7 = [][0];;) {
        use(y_7);
    }
    for (var z_7 = { a: 1 }.a;;) {
        use(z_7);
    }
    use(x);
}
function foo4() {
    for (var x_8 = 1;;) {
        use(x_8);
    }
    for (var y_8 = [][0];;) {
        use(y_8);
    }
    for (var z_8 = { a: 1 }.a;;) {
        use(z_8);
    }
    use(x);
}
function foo5() {
    for (var x_9 in []) {
        use(x_9);
    }
    use(x);
}
function foo6() {
    for (var x_10 in []) {
        use(x_10);
    }
    use(x);
}
function foo7() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_11 = _a[_i];
        use(x_11);
    }
    use(x);
}
function foo8() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_12 = _a[_i][0];
        use(x_12);
    }
    use(x);
}
function foo9() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_13 = _a[_i].a;
        use(x_13);
    }
    use(x);
}
function foo10() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_14 = _a[_i];
        use(x_14);
    }
    use(x);
}
function foo11() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_15 = _a[_i][0];
        use(x_15);
    }
    use(x);
}
function foo12() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_16 = _a[_i].a;
        use(x_16);
    }
    use(x);
}
