//// [declarationUsesKeyofAliasWherePossible.ts]
var Foo = class Foo {
    method<T extends keyof ElementTagNameMap>() {};
}

class Bar {
    method<T extends keyof ElementTagNameMap>() {};
}

//// [declarationUsesKeyofAliasWherePossible.js]
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.prototype.method = function () { };
    ;
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Bar.prototype.method = function () { };
    ;
    return Bar;
}());


//// [declarationUsesKeyofAliasWherePossible.d.ts]
declare var Foo: {
    new (): {
        method<T extends keyof ElementTagNameMap>(): void;
    };
};
declare class Bar {
    method<T extends keyof ElementTagNameMap>(): void;
}
