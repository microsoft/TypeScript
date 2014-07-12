//// [for-inStatementsInvalid.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var aNumber;
for (aNumber in {}) {
}

var aBoolean;
for (aBoolean in {}) {
}

var aRegExp;
for (aRegExp in {}) {
}

for (var idx in {}) {
}

function fn() {
}
for (var x in fn()) {
}

var c, d, e;

for (var x in c || d) {
}
for (var x in e ? c : d) {
}
for (var x in 42 ? c : d) {
}
for (var x in '' ? c : d) {
}
for (var x in 42 ? d[x] : c[x]) {
}
for (var x in c[23]) {
}

for (var x in (function (x) {
    return x;
})) {
}
for (var x in function (x, y) {
    return x + y;
}) {
}

var A = (function () {
    function A() {
    }
    A.prototype.biz = function () {
        for (var x in this.biz()) {
        }
        for (var x in this.biz) {
        }
        for (var x in this) {
        }
        return null;
    };

    A.baz = function () {
        for (var x in this) {
        }
        for (var x in this.baz) {
        }
        for (var x in this.baz()) {
        }

        return null;
    };
    return A;
})();

var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    B.prototype.boz = function () {
        for (var x in this.biz()) {
        }
        for (var x in this.biz) {
        }
        for (var x in this) {
        }

        for (var x in _super.prototype.biz) {
        }
        for (var x in _super.prototype.biz.call(this)) {
        }
        return null;
    };
    return B;
})(A);

var i;

for (var x in i[42]) {
}
