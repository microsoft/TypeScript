//// [typeVariableTypeGuards.ts]
// Repro from #14091

interface Foo {
    foo(): void
}

class A<P extends Partial<Foo>> {
    constructor(public props: Readonly<P>) {}
    doSomething() {
        this.props.foo && this.props.foo()
    }
}

// Repro from #14415

interface Banana {
    color: 'yellow';
}

class Monkey<T extends Banana | undefined> {
    constructor(public a: T) {}
    render() {
        if (this.a) {
            this.a.color;
        }
    }
}

interface BigBanana extends Banana {
}

class BigMonkey extends Monkey<BigBanana> {
    render() {
        if (this.a) {
            this.a.color;
        }
    }
}

// Another repro

type Item = {
    (): string;
    x: string;
}

function f1<T extends Item | undefined>(obj: T) {
    if (obj) {
        obj.x;
        obj["x"];
        obj();
    }
}

function f2<T extends Item | undefined>(obj: T | undefined) {
    if (obj) {
        obj.x;
        obj["x"];
        obj();
    }
}

function f3<T extends Item | undefined>(obj: T | null) {
    if (obj) {
        obj.x;
        obj["x"];
        obj();
    }
}

function f4<T extends string[] | undefined>(obj: T | undefined, x: number) {
    if (obj) {
        obj[x].length;
    }
}

function f5<T, K extends keyof T>(obj: T | undefined, key: K) {
    if (obj) {
        obj[key];
    }
}


//// [typeVariableTypeGuards.js]
"use strict";
// Repro from #14091
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A(props) {
        this.props = props;
    }
    A.prototype.doSomething = function () {
        this.props.foo && this.props.foo();
    };
    return A;
}());
var Monkey = /** @class */ (function () {
    function Monkey(a) {
        this.a = a;
    }
    Monkey.prototype.render = function () {
        if (this.a) {
            this.a.color;
        }
    };
    return Monkey;
}());
var BigMonkey = /** @class */ (function (_super) {
    __extends(BigMonkey, _super);
    function BigMonkey() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BigMonkey.prototype.render = function () {
        if (this.a) {
            this.a.color;
        }
    };
    return BigMonkey;
}(Monkey));
function f1(obj) {
    if (obj) {
        obj.x;
        obj["x"];
        obj();
    }
}
function f2(obj) {
    if (obj) {
        obj.x;
        obj["x"];
        obj();
    }
}
function f3(obj) {
    if (obj) {
        obj.x;
        obj["x"];
        obj();
    }
}
function f4(obj, x) {
    if (obj) {
        obj[x].length;
    }
}
function f5(obj, key) {
    if (obj) {
        obj[key];
    }
}
