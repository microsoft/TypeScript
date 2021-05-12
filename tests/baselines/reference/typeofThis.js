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

//// [typeofThis.js]
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
        this["this"] = 0;
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
        if (this["this"] === 1) {
            var no = this["this"];
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
