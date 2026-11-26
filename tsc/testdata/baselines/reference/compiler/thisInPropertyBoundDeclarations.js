//// [tests/cases/compiler/thisInPropertyBoundDeclarations.ts] ////

//// [thisInPropertyBoundDeclarations.ts]
class Bug {
    private name: string;

    private static func: Function[] = [
     (that: Bug, name: string) => {
         that.foo(name);
     }
    ];

    private foo(name: string) {
        this.name = name;
    }
}

// Valid use of this in a property bound decl
class A {
    prop1 = function() {
        this;
    };

    prop2 = function() {
        function inner() {
            this;
        }
        () => this;
    };

    prop3 = () => {
        function inner() {
            this;
        }
    };

    prop4 = {
        a: function() { return this; },
    };

    prop5 = () => {
        return {
            a: function() { return this; },
        };
    };
}

class B {
    prop1 = this;

    prop2 = () => this;

    prop3 = () => () => () => () => this;

    prop4 = '  ' +
    function() {
    } +
    ' ' +
    (() => () => () => this);

    prop5 = {
        a: () => { return this; }
    };

    prop6 = () => {
        return {
            a: () => { return this; }
        };
    };
}

//// [thisInPropertyBoundDeclarations.js]
"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
class Bug {
    foo(name) {
        this.name = name;
    }
}
Bug.func = [
    (that, name) => {
        that.foo(name);
    }
];
// Valid use of this in a property bound decl
class A {
    constructor() {
        this.prop1 = __setFunctionName(function () {
            this;
        }, "prop1");
        this.prop2 = __setFunctionName(function () {
            function inner() {
                this;
            }
            () => this;
        }, "prop2");
        this.prop3 = __setFunctionName(() => {
            function inner() {
                this;
            }
        }, "prop3");
        this.prop4 = {
            a: function () { return this; },
        };
        this.prop5 = __setFunctionName(() => {
            return {
                a: function () { return this; },
            };
        }, "prop5");
    }
}
class B {
    constructor() {
        this.prop1 = this;
        this.prop2 = __setFunctionName(() => this, "prop2");
        this.prop3 = __setFunctionName(() => () => () => () => this, "prop3");
        this.prop4 = '  ' +
            function () {
            } +
            ' ' +
            (() => () => () => this);
        this.prop5 = {
            a: () => { return this; }
        };
        this.prop6 = __setFunctionName(() => {
            return {
                a: () => { return this; }
            };
        }, "prop6");
    }
}
