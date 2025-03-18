//// [tests/cases/compiler/methodContainingLocalFunction.ts] ////

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
class BugExhibition {
    exhibitBug() {
        function localFunction() { }
        var x;
        x = localFunction;
    }
}
class BugExhibition2 {
    static get exhibitBug() {
        function localFunction() { }
        var x;
        x = localFunction;
        return null;
    }
}
class BugExhibition3 {
    exhibitBug() {
        function localGenericFunction(u) { }
        var x;
        x = localGenericFunction;
    }
}
class C {
    exhibit() {
        var funcExpr = (u) => { };
        var x;
        x = funcExpr;
    }
}
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
    E["A"] = (() => {
        function localFunction() { }
        var x;
        x = localFunction;
        return 0;
    })();
    if (typeof E.A !== "string") E[E.A] = "A";
})(E || (E = {}));
