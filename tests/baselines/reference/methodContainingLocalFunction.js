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
// The first case here (BugExhibition<T>) caused a crash. Try with different permutations of features.
var BugExhibition = /** @class */ (function () {
    function BugExhibition() {
    }
    BugExhibition.prototype.exhibitBug = function () {
        function localFunction() { }
        var x;
        x = localFunction;
    };
    return BugExhibition;
}());
var BugExhibition2 = /** @class */ (function () {
    function BugExhibition2() {
    }
    Object.defineProperty(BugExhibition2, "exhibitBug", {
        get: function () {
            function localFunction() { }
            var x;
            x = localFunction;
            return null;
        },
        enumerable: false,
        configurable: true
    });
    return BugExhibition2;
}());
var BugExhibition3 = /** @class */ (function () {
    function BugExhibition3() {
    }
    BugExhibition3.prototype.exhibitBug = function () {
        function localGenericFunction(u) { }
        var x;
        x = localGenericFunction;
    };
    return BugExhibition3;
}());
var C = /** @class */ (function () {
    function C() {
    }
    C.prototype.exhibit = function () {
        var funcExpr = function (u) { };
        var x;
        x = funcExpr;
    };
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
