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
    var x_1 = 1;
    use(x_1);
    var y_1 = ([
        1
    ])[0];
    use(y_1);
    var z_1 = ({
        a: 1
    }).a;
    use(z_1);
}
function foo2() {
    {
        var x_2 = 1;
        use(x_2);
        var y_2 = ([
            1
        ])[0];
        use(y_2);
        var z_2 = ({
            a: 1
        }).a;
        use(z_2);
    }
    use(x);
}
var A = (function () {
    function A() {
    }
    A.prototype.m1 = function () {
        var x_3 = 1;
        use(x_3);
        var y_3 = ([
            1
        ])[0];
        use(y_3);
        var z_3 = ({
            a: 1
        }).a;
        use(z_3);
    };
    A.prototype.m2 = function () {
        {
            var x_4 = 1;
            use(x_4);
            var y_4 = ([
                1
            ])[0];
            use(y_4);
            var z_4 = ({
                a: 1
            }).a;
            use(z_4);
        }
        use(x);
    };
    return A;
})();
var B = (function () {
    function B() {
    }
    B.prototype.m1 = function () {
        var x_5 = 1;
        use(x_5);
        var y_5 = ([
            1
        ])[0];
        use(y_5);
        var z_5 = ({
            a: 1
        }).a;
        use(z_5);
    };
    B.prototype.m2 = function () {
        {
            var x_6 = 1;
            use(x_6);
            var y_6 = ([
                1
            ])[0];
            use(y_6);
            var z_6 = ({
                a: 1
            }).a;
            use(z_6);
        }
        use(x);
    };
    return B;
})();
function bar1() {
    var x_7 = 1;
    use(x_7);
    var y_7 = ([
        1
    ])[0];
    use(y_7);
    var z_7 = ({
        a: 1
    }).a;
    use(z_7);
}
function bar2() {
    {
        var x_8 = 1;
        use(x_8);
        var y_8 = ([
            1
        ])[0];
        use(y_8);
        var z_8 = ({
            a: 1
        }).a;
        use(z_8);
    }
    use(x);
}
var M1;
(function (M1) {
    var x_9 = 1;
    use(x_9);
    var y_9 = ([
        1
    ])[0];
    use(y_9);
    var z_9 = ({
        a: 1
    }).a;
    use(z_9);
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    {
        var x_10 = 1;
        use(x_10);
        var y_10 = ([
            1
        ])[0];
        use(y_10);
        var z_10 = ({
            a: 1
        }).a;
        use(z_10);
    }
    use(x);
})(M2 || (M2 = {}));
var M3;
(function (M3) {
    var x_11 = 1;
    use(x_11);
    var y_11 = ([
        1
    ])[0];
    use(y_11);
    var z_11 = ({
        a: 1
    }).a;
    use(z_11);
})(M3 || (M3 = {}));
var M4;
(function (M4) {
    {
        var x_12 = 1;
        use(x_12);
        var y_12 = ([
            1
        ])[0];
        use(y_12);
        var z_12 = ({
            a: 1
        }).a;
        use(z_12);
    }
    use(x);
    use(y);
    use(z);
})(M4 || (M4 = {}));
function foo3() {
    for (var x_13 = void 0;;) {
        use(x_13);
    }
    for (var y_13 = ([])[0];;) {
        use(y_13);
    }
    for (var z_13 = ({
        a: 1
    }).a;;) {
        use(z_13);
    }
    use(x);
}
function foo4() {
    for (var x_14 = 1;;) {
        use(x_14);
    }
    for (var y_14 = ([])[0];;) {
        use(y_14);
    }
    for (var z_14 = ({
        a: 1
    }).a;;) {
        use(z_14);
    }
    use(x);
}
function foo5() {
    for (var x_15 in []) {
        use(x_15);
    }
    use(x);
}
function foo6() {
    for (var x_16 in []) {
        use(x_16);
    }
    use(x);
}
function foo7() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_17 = _a[_i];
        use(x_17);
    }
    use(x);
}
function foo8() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_18 = _a[_i][0];
        use(x_18);
    }
    use(x);
}
function foo9() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_19 = _a[_i].a;
        use(x_19);
    }
    use(x);
}
function foo10() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_20 = _a[_i];
        use(x_20);
    }
    use(x);
}
function foo11() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_21 = _a[_i][0];
        use(x_21);
    }
    use(x);
}
function foo12() {
    for (var _i = 0, _a = []; _i < _a.length; _i++) {
        var x_22 = _a[_i].a;
        use(x_22);
    }
    use(x);
}
