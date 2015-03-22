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
    var _x = 1;
    use(_x);
    var _y = ([
        1
    ])[0];
    use(_y);
    var _z = ({
        a: 1
    }).a;
    use(_z);
}
function foo2() {
    {
        var _x_1 = 1;
        use(_x_1);
        var _y_1 = ([
            1
        ])[0];
        use(_y_1);
        var _z_1 = ({
            a: 1
        }).a;
        use(_z_1);
    }
    use(x);
}
var A = (function () {
    function A() {
    }
    A.prototype.m1 = function () {
        var _x_2 = 1;
        use(_x_2);
        var _y_2 = ([
            1
        ])[0];
        use(_y_2);
        var _z_2 = ({
            a: 1
        }).a;
        use(_z_2);
    };
    A.prototype.m2 = function () {
        {
            var _x_3 = 1;
            use(_x_3);
            var _y_3 = ([
                1
            ])[0];
            use(_y_3);
            var _z_3 = ({
                a: 1
            }).a;
            use(_z_3);
        }
        use(x);
    };
    return A;
})();
var B = (function () {
    function B() {
    }
    B.prototype.m1 = function () {
        var _x_4 = 1;
        use(_x_4);
        var _y_4 = ([
            1
        ])[0];
        use(_y_4);
        var _z_4 = ({
            a: 1
        }).a;
        use(_z_4);
    };
    B.prototype.m2 = function () {
        {
            var _x_5 = 1;
            use(_x_5);
            var _y_5 = ([
                1
            ])[0];
            use(_y_5);
            var _z_5 = ({
                a: 1
            }).a;
            use(_z_5);
        }
        use(x);
    };
    return B;
})();
function bar1() {
    var _x_6 = 1;
    use(_x_6);
    var _y_6 = ([
        1
    ])[0];
    use(_y_6);
    var _z_6 = ({
        a: 1
    }).a;
    use(_z_6);
}
function bar2() {
    {
        var _x_7 = 1;
        use(_x_7);
        var _y_7 = ([
            1
        ])[0];
        use(_y_7);
        var _z_7 = ({
            a: 1
        }).a;
        use(_z_7);
    }
    use(x);
}
var M1;
(function (M1) {
    var _x_8 = 1;
    use(_x_8);
    var _y_8 = ([
        1
    ])[0];
    use(_y_8);
    var _z_8 = ({
        a: 1
    }).a;
    use(_z_8);
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    {
        var _x_9 = 1;
        use(_x_9);
        var _y_9 = ([
            1
        ])[0];
        use(_y_9);
        var _z_9 = ({
            a: 1
        }).a;
        use(_z_9);
    }
    use(x);
})(M2 || (M2 = {}));
var M3;
(function (M3) {
    var _x_10 = 1;
    use(_x_10);
    var _y_10 = ([
        1
    ])[0];
    use(_y_10);
    var _z_10 = ({
        a: 1
    }).a;
    use(_z_10);
})(M3 || (M3 = {}));
var M4;
(function (M4) {
    {
        var _x_11 = 1;
        use(_x_11);
        var _y_11 = ([
            1
        ])[0];
        use(_y_11);
        var _z_11 = ({
            a: 1
        }).a;
        use(_z_11);
    }
    use(x);
    use(y);
    use(z);
})(M4 || (M4 = {}));
function foo3() {
    for (var _x_12 = void 0;;) {
        use(_x_12);
    }
    for (var _y_12 = ([])[0];;) {
        use(_y_12);
    }
    for (var _z_12 = ({
        a: 1
    }).a;;) {
        use(_z_12);
    }
    use(x);
}
function foo4() {
    for (var _x_13 = 1;;) {
        use(_x_13);
    }
    for (var _y_13 = ([])[0];;) {
        use(_y_13);
    }
    for (var _z_13 = ({
        a: 1
    }).a;;) {
        use(_z_13);
    }
    use(x);
}
function foo5() {
    for (var _x_14 in []) {
        use(_x_14);
    }
    use(x);
}
function foo6() {
    for (var _x_15 in []) {
        use(_x_15);
    }
    use(x);
}
function foo7() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var _x_16 = _a[_i];
        use(_x_16);
    }
    use(x);
}
function foo8() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var _x_17 = _a[_i][0];
        use(_x_17);
    }
    use(x);
}
function foo9() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var _x_18 = _a[_i].a;
        use(_x_18);
    }
    use(x);
}
function foo10() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var _x_19 = _a[_i];
        use(_x_19);
    }
    use(x);
}
function foo11() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var _x_20 = _a[_i][0];
        use(_x_20);
    }
    use(x);
}
function foo12() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var _x_21 = _a[_i].a;
        use(_x_21);
    }
    use(x);
}
