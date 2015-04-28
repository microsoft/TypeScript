//// [abstractClass1.ts]

abstract class Foo {
    constructor(f: any) { }
    public static bar(): void { }

    public empty() { }
}

class Bar extends Foo {
    constructor(f: any) {
        super(f);
    }
}

var a = new Foo(1); // Error
var b = new Foo(); // Error because of invalid constructor arguments

module baz {
    export abstract class Qux {
    }
    export class Quz extends Qux {
    }
}

new baz.Qux();

// Valid
var c = new Bar(1);
c.empty();

// Calling a static method on a abstract class is valid
Foo.bar();

var Copy = Foo;
new Copy();


//// [abstractClass1.js]
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Foo = (function () {
    function Foo(f) {
    }
    Foo.bar = function () { };
    Foo.prototype.empty = function () { };
    return Foo;
})();
var Bar = (function (_super) {
    __extends(Bar, _super);
    function Bar(f) {
        _super.call(this, f);
    }
    return Bar;
})(Foo);
var a = new Foo(1); // Error
var b = new Foo(); // Error because of invalid constructor arguments
var baz;
(function (baz) {
    var Qux = (function () {
        function Qux() {
        }
        return Qux;
    })();
    baz.Qux = Qux;
    var Quz = (function (_super) {
        __extends(Quz, _super);
        function Quz() {
            _super.apply(this, arguments);
        }
        return Quz;
    })(Qux);
    baz.Quz = Quz;
})(baz || (baz = {}));
new baz.Qux();
// Valid
var c = new Bar(1);
c.empty();
// Calling a static method on a abstract class is valid
Foo.bar();
var Copy = Foo;
new Copy();


//// [abstractClass1.d.ts]
declare abstract class Foo {
    constructor(f: any);
    static bar(): void;
    empty(): void;
}
declare class Bar extends Foo {
    constructor(f: any);
}
declare var a: Foo;
declare var b: any;
declare module baz {
    abstract class Qux {
    }
    class Quz extends Qux {
    }
}
declare var c: Bar;
declare var Copy: typeof Foo;
