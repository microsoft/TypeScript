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
let Bug = (() => {
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
    return Bug;
})();
// Valid use of this in a property bound decl
class A {
    constructor() {
        this.prop1 = function () {
            this;
        };
        this.prop2 = function () {
            function inner() {
                this;
            }
            () => this;
        };
        this.prop3 = () => {
            function inner() {
                this;
            }
        };
        this.prop4 = {
            a: function () { return this; },
        };
        this.prop5 = () => {
            return {
                a: function () { return this; },
            };
        };
    }
}
class B {
    constructor() {
        this.prop1 = this;
        this.prop2 = () => this;
        this.prop3 = () => () => () => () => this;
        this.prop4 = '  ' +
            function () {
            } +
            ' ' +
            (() => () => () => this);
        this.prop5 = {
            a: () => { return this; }
        };
        this.prop6 = () => {
            return {
                a: () => { return this; }
            };
        };
    }
}
