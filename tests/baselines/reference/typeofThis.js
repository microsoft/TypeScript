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
        let x: typeof this.no = 1;
        let self: typeof this = this;
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
        var _this = this;
        this.no = 1;
        this.f = function () {
            var x = 1;
            var self = _this;
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
