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
