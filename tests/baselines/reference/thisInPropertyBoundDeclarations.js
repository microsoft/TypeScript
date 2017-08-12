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
var Bug = (function () {
    function Bug() {
    }
    Bug.prototype.foo = function (name) {
        this.name = name;
    };
    __names(Bug.prototype, ["foo"]);
    Bug.func = [
        function (that, name) {
            that.foo(name);
        }
    ];
    return Bug;
}());
// Valid use of this in a property bound decl
var A = (function () {
    function A() {
        this.prop1 = function () {
            this;
        };
        this.prop2 = function () {
            var _this = this;
            function inner() {
                this;
            }
            (function () { return _this; });
        };
        this.prop3 = function () {
            function inner() {
                this;
            }
        };
        this.prop4 = {
            a: function () { return this; }
        };
        this.prop5 = function () {
            return {
                a: function () { return this; }
            };
        };
    }
    return A;
}());
var B = (function () {
    function B() {
        var _this = this;
        this.prop1 = this;
        this.prop2 = function () { return _this; };
        this.prop3 = function () { return function () { return function () { return function () { return _this; }; }; }; };
        this.prop4 = '  ' +
            function () {
            } +
            ' ' +
            (function () { return function () { return function () { return _this; }; }; });
        this.prop5 = {
            a: function () { return _this; }
        };
        this.prop6 = function () {
            return {
                a: function () { return _this; }
            };
        };
    }
    return B;
}());
