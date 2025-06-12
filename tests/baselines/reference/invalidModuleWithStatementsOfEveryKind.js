//// [tests/cases/conformance/internalModules/moduleBody/invalidModuleWithStatementsOfEveryKind.ts] ////

//// [invalidModuleWithStatementsOfEveryKind.ts]
// All of these should be an error

module Y {
    public class A { s: string }

    public class BB<T> extends A {
        id: number;
    }
}

module Y2 {
    public class AA<T> { s: T }
    public interface I { id: number }

    public class B extends AA<string> implements I { id: number }
}

module Y3 {
    public module Module {
        class A { s: string }
    }
}

module Y4 {
    public enum Color { Blue, Red }
}

module YY {
    private class A { s: string }

    private class BB<T> extends A {
        id: number;
    }
}

module YY2 {
    private class AA<T> { s: T }
    private interface I { id: number }

    private class B extends AA<string> implements I { id: number }
}

module YY3 {
    private module Module {
        class A { s: string }
    }
}

module YY4 {
    private enum Color { Blue, Red }
}


module YYY {
    static class A { s: string }

    static class BB<T> extends A {
        id: number;
    }
}

module YYY2 {
    static class AA<T> { s: T }
    static interface I { id: number }

    static class B extends AA<string> implements I { id: number }
}

module YYY3 {
    static module Module {
        class A { s: string }
    }
}

module YYY4 {
    static enum Color { Blue, Red }
}


//// [invalidModuleWithStatementsOfEveryKind.js]
// All of these should be an error
var Y;
(function (Y) {
    class A {
    }
    class BB extends A {
    }
})(Y || (Y = {}));
var Y2;
(function (Y2) {
    class AA {
    }
    class B extends AA {
    }
})(Y2 || (Y2 = {}));
var Y3;
(function (Y3) {
    let Module;
    (function (Module) {
        class A {
        }
    })(Module || (Module = {}));
})(Y3 || (Y3 = {}));
var Y4;
(function (Y4) {
    let Color;
    (function (Color) {
        Color[Color["Blue"] = 0] = "Blue";
        Color[Color["Red"] = 1] = "Red";
    })(Color || (Color = {}));
})(Y4 || (Y4 = {}));
var YY;
(function (YY) {
    class A {
    }
    class BB extends A {
    }
})(YY || (YY = {}));
var YY2;
(function (YY2) {
    class AA {
    }
    class B extends AA {
    }
})(YY2 || (YY2 = {}));
var YY3;
(function (YY3) {
    let Module;
    (function (Module) {
        class A {
        }
    })(Module || (Module = {}));
})(YY3 || (YY3 = {}));
var YY4;
(function (YY4) {
    let Color;
    (function (Color) {
        Color[Color["Blue"] = 0] = "Blue";
        Color[Color["Red"] = 1] = "Red";
    })(Color || (Color = {}));
})(YY4 || (YY4 = {}));
var YYY;
(function (YYY) {
    static class A {
    }
    static class BB extends A {
    }
})(YYY || (YYY = {}));
var YYY2;
(function (YYY2) {
    static class AA {
    }
    static class B extends AA {
    }
})(YYY2 || (YYY2 = {}));
var YYY3;
(function (YYY3) {
    static let Module;
    (function (Module) {
        class A {
        }
    })(Module || (Module = {}));
})(YYY3 || (YYY3 = {}));
var YYY4;
(function (YYY4) {
    static let Color;
    (function (Color) {
        Color[Color["Blue"] = 0] = "Blue";
        Color[Color["Red"] = 1] = "Red";
    })(Color || (Color = {}));
})(YYY4 || (YYY4 = {}));
