//// [arrowFunctionContexts.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var _this = this;
with (window) {
    var p = function () {
        return this;
    };
}

// Arrow function as argument to super call
var Base = (function () {
    function Base(n) {
    }
    return Base;
})();

var Derived = (function (_super) {
    __extends(Derived, _super);
    function Derived() {
        var _this = this;
        _super.call(this, function () {
            return _this;
        });
    }
    return Derived;
})(Base);

// Arrow function as function argument
window.setTimeout(function () {
    return null;
}, 100);

// Arrow function as value in array literal
var obj = function (n) {
    return '';
};
var obj;

var arr = [function (n) {
        return '';
    }];
var arr;

// Arrow function as enum value
var E;
(function (E) {
    E[E["x"] = function () {
        return 4;
    }] = "x";
    E[E["y"] = (function () {
        return _this;
    }).length] = "y";
})(E || (E = {}));

// Arrow function as module variable initializer
var M;
(function (M) {
    M.a = function (s) {
        return '';
    };
    var b = function (s) {
        return s;
    };
})(M || (M = {}));

// Repeat above for module members that are functions? (necessary to redo all of them?)
var M2;
(function (M2) {
    var _this = this;
    with (window) {
        var p = function () {
            return this;
        };
    }

    // Arrow function as argument to super call
    var Base = (function () {
        function Base(n) {
        }
        return Base;
    })();

    var Derived = (function (_super) {
        __extends(Derived, _super);
        function Derived() {
            var _this = this;
            _super.call(this, function () {
                return _this;
            });
        }
        return Derived;
    })(Base);

    // Arrow function as function argument
    window.setTimeout(function () {
        return null;
    }, 100);

    // Arrow function as value in array literal
    var obj = function (n) {
        return '';
    };
    var obj;

    var arr = [function (n) {
            return '';
        }];
    var arr;

    // Arrow function as enum value
    var E;
    (function (E) {
        E[E["x"] = function () {
            return 4;
        }] = "x";
        E[E["y"] = (function () {
            return _this;
        }).length] = "y";
    })(E || (E = {}));

    // Arrow function as module variable initializer
    var M;
    (function (M) {
        M.a = function (s) {
            return '';
        };
        var b = function (s) {
            return s;
        };
    })(M || (M = {}));
})(M2 || (M2 = {}));

// <Identifier>(ParamList) => { ... } is a generic arrow function
var generic1 = function (n) {
    return [n];
};
var generic1;
var generic2 = function (n) {
    return [n];
};
var generic2;

// <Identifier> ((ParamList) => { ... } ) is a type assertion to an arrow function
var asserted1 = (function (n) {
    return [n];
});
var asserted1;
var asserted2 = (function (n) {
    return n;
});
var asserted2;
