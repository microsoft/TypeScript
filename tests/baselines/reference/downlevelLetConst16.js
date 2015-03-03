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

// TODO: once for-of is supported downlevel
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
    var _y = ([1])[0];
    use(_y);
    var _z = ({ a: 1 }).a;
    use(_z);
}
function foo2() {
    {
        var _x = 1;
        use(_x);
        var _y = ([1])[0];
        use(_y);
        var _z = ({ a: 1 }).a;
        use(_z);
    }
    use(x);
}
var A = (function () {
    function A() {
    }
    A.prototype.m1 = function () {
        var _x = 1;
        use(_x);
        var _y = ([1])[0];
        use(_y);
        var _z = ({ a: 1 }).a;
        use(_z);
    };
    A.prototype.m2 = function () {
        {
            var _x = 1;
            use(_x);
            var _y = ([1])[0];
            use(_y);
            var _z = ({ a: 1 }).a;
            use(_z);
        }
        use(x);
    };
    return A;
})();
var B = (function () {
    function B() {
    }
    B.prototype.m1 = function () {
        var _x = 1;
        use(_x);
        var _y = ([1])[0];
        use(_y);
        var _z = ({ a: 1 }).a;
        use(_z);
    };
    B.prototype.m2 = function () {
        {
            var _x = 1;
            use(_x);
            var _y = ([1])[0];
            use(_y);
            var _z = ({ a: 1 }).a;
            use(_z);
        }
        use(x);
    };
    return B;
})();
function bar1() {
    var _x = 1;
    use(_x);
    var _y = ([1])[0];
    use(_y);
    var _z = ({ a: 1 }).a;
    use(_z);
}
function bar2() {
    {
        var _x = 1;
        use(_x);
        var _y = ([1])[0];
        use(_y);
        var _z = ({ a: 1 }).a;
        use(_z);
    }
    use(x);
}
var M1;
(function (M1) {
    var _x = 1;
    use(_x);
    var _y = ([1])[0];
    use(_y);
    var _z = ({ a: 1 }).a;
    use(_z);
})(M1 || (M1 = {}));
var M2;
(function (M2) {
    {
        var _x = 1;
        use(_x);
        var _y = ([1])[0];
        use(_y);
        var _z = ({ a: 1 }).a;
        use(_z);
    }
    use(x);
})(M2 || (M2 = {}));
var M3;
(function (M3) {
    var _x = 1;
    use(_x);
    var _y = ([1])[0];
    use(_y);
    var _z = ({ a: 1 }).a;
    use(_z);
})(M3 || (M3 = {}));
var M4;
(function (M4) {
    {
        var _x = 1;
        use(_x);
        var _y = ([1])[0];
        use(_y);
        var _z = ({ a: 1 }).a;
        use(_z);
    }
    use(x);
    use(y);
    use(z);
})(M4 || (M4 = {}));
function foo3() {
    for (var _x = void 0;;) {
        use(_x);
    }
    for (var _y = ([])[0];;) {
        use(_y);
    }
    for (var _z = ({ a: 1 }).a;;) {
        use(_z);
    }
    use(x);
}
function foo4() {
    for (var _x = 1;;) {
        use(_x);
    }
    for (var _y = ([])[0];;) {
        use(_y);
    }
    for (var _z = ({ a: 1 }).a;;) {
        use(_z);
    }
    use(x);
}
function foo5() {
    for (var _x in []) {
        use(_x);
    }
    use(x);
}
function foo6() {
    for (var _x in []) {
        use(_x);
    }
    use(x);
}
// TODO: once for-of is supported downlevel
function foo7() {
    for (var _x of []) {
        use(_x);
    }
    use(x);
}
function foo8() {
    for (var _x = (void 0)[0] of []) {
        use(_x);
    }
    use(x);
}
function foo9() {
    for (var _x = (void 0).a of []) {
        use(_x);
    }
    use(x);
}
function foo10() {
    for (var _x of []) {
        use(_x);
    }
    use(x);
}
function foo11() {
    for (var _x = (void 0)[0] of []) {
        use(_x);
    }
    use(x);
}
function foo12() {
    for (var _x = (void 0).a of []) {
        use(_x);
    }
    use(x);
}
