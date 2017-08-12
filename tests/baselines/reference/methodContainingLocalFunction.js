//// [methodContainingLocalFunction.ts]
// The first case here (BugExhibition<T>) caused a crash. Try with different permutations of features.
class BugExhibition<T> {
    public exhibitBug() {
        function localFunction() { }
        var x: { (): void; };
        x = localFunction;
    }
}

class BugExhibition2<T> {
    private static get exhibitBug() {
        function localFunction() { }
        var x: { (): void; };
        x = localFunction;
        return null;
    }
}

class BugExhibition3<T> {
    public exhibitBug() {
        function localGenericFunction<U>(u?: U) { }
        var x: { (): void; };
        x = localGenericFunction;
    }
}

class C {
    exhibit() {
        var funcExpr = <U>(u?: U) => { };
        var x: { (): void; };
        x = funcExpr;
    }
}

module M {
    export function exhibitBug() {
        function localFunction() { }
        var x: { (): void; };
        x = localFunction;
    }
}

enum E {
    A = (() => {
        function localFunction() { }
        var x: { (): void; };
        x = localFunction;
        return 0;
    })()
}

//// [methodContainingLocalFunction.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
// The first case here (BugExhibition<T>) caused a crash. Try with different permutations of features.
var BugExhibition = (function () {
    function BugExhibition() {
    }
    BugExhibition.prototype.exhibitBug = function () {
        function localFunction() { }
        var x;
        x = localFunction;
    };
    __names(BugExhibition.prototype, ["exhibitBug"]);
    return BugExhibition;
}());
var BugExhibition2 = (function () {
    function BugExhibition2() {
    }
    Object.defineProperty(BugExhibition2, "exhibitBug", {
        get: function () {
            function localFunction() { }
            var x;
            x = localFunction;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    return BugExhibition2;
}());
var BugExhibition3 = (function () {
    function BugExhibition3() {
    }
    BugExhibition3.prototype.exhibitBug = function () {
        function localGenericFunction(u) { }
        var x;
        x = localGenericFunction;
    };
    __names(BugExhibition3.prototype, ["exhibitBug"]);
    return BugExhibition3;
}());
var C = (function () {
    function C() {
    }
    C.prototype.exhibit = function () {
        var funcExpr = function (u) { };
        var x;
        x = funcExpr;
    };
    __names(C.prototype, ["exhibit"]);
    return C;
}());
var M;
(function (M) {
    function exhibitBug() {
        function localFunction() { }
        var x;
        x = localFunction;
    }
    M.exhibitBug = exhibitBug;
})(M || (M = {}));
var E;
(function (E) {
    E[E["A"] = (function () {
        function localFunction() { }
        var x;
        x = localFunction;
        return 0;
    })()] = "A";
})(E || (E = {}));
