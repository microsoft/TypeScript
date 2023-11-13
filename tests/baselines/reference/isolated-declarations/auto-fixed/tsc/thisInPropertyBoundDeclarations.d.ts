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
    prop1 = function(): void {
        this;
    };

    prop2 = function(): void {
        function inner() {
            this;
        }
        () => this;
    };

    prop3 = (): void => {
        function inner() {
            this;
        }
    };

    prop4 = {
        a: function(): any { return this; },
    };

    prop5 = (): {
        a: () => any;
    } => {
        return {
            a: function() { return this; },
        };
    };
}

class B {
    prop1: this = this;

    prop2 = (): this => this;

    prop3 = (): () => () => () => this => () => () => () => this;

    prop4: string = '  ' +
    function() {
    } +
    ' ' +
    (() => () => () => this);

    prop5 = {
        a: (): this => { return this; }
    };

    prop6 = () => {
        return {
            a: () => { return this; }
        };
    };
}

/// [Declarations] ////



//// [thisInPropertyBoundDeclarations.d.ts]
declare class Bug {
    private name;
    private static func;
    private foo;
}
declare class A {
    prop1: () => void;
    prop2: () => void;
    prop3: () => void;
    prop4: {
        a: () => any;
    };
    prop5: () => {
        a: () => any;
    };
}
declare class B {
    prop1: this;
    prop2: () => this;
    prop3: () => () => () => () => this;
    prop4: string;
    prop5: {
        a: () => this;
    };
    prop6: any;
}
/// [Errors] ////

thisInPropertyBoundDeclarations.ts(64,5): error TS2527: The inferred type of 'prop6' references an inaccessible 'this' type. A type annotation is necessary.


==== thisInPropertyBoundDeclarations.ts (1 errors) ====
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
        prop1 = function(): void {
            this;
        };
    
        prop2 = function(): void {
            function inner() {
                this;
            }
            () => this;
        };
    
        prop3 = (): void => {
            function inner() {
                this;
            }
        };
    
        prop4 = {
            a: function(): any { return this; },
        };
    
        prop5 = (): {
            a: () => any;
        } => {
            return {
                a: function() { return this; },
            };
        };
    }
    
    class B {
        prop1: this = this;
    
        prop2 = (): this => this;
    
        prop3 = (): () => () => () => this => () => () => () => this;
    
        prop4: string = '  ' +
        function() {
        } +
        ' ' +
        (() => () => () => this);
    
        prop5 = {
            a: (): this => { return this; }
        };
    
        prop6 = () => {
        ~~~~~
!!! error TS2527: The inferred type of 'prop6' references an inaccessible 'this' type. A type annotation is necessary.
            return {
                a: () => { return this; }
            };
        };
    }