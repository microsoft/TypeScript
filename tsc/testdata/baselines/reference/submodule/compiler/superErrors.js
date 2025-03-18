//// [tests/cases/compiler/superErrors.ts] ////

//// [superErrors.ts]
function foo() {
    // super in a non class context
    var x = super;
    var y = () => super;
    var z = () => () => () => super;
}

class User {
    name: string = "Bob";
    sayHello(): void {
        //console.log("Hello, " + this.name);
    }
}

class RegisteredUser extends User {
    name: string = "Frank";
    constructor() {
        super();

        // super call in an inner function in a constructor
        function inner() {
            super.sayHello();
        }

        // super call in a lambda in an inner function in a constructor 
        function inner2() {
            var x = () => super.sayHello();
        }

        // super call in a lambda in a function expression in a constructor 
        (function() { return () => super; })();
    }
    sayHello(): void {
        // super call in a method
        super.sayHello();

        // super call in a lambda in an inner function in a method
        function inner() {
            var x = () => super.sayHello();
        }

        // super call in a lambda in a function expression in a constructor 
        (function() { return () => super; })();
    }
    static staticFunction(): void {
        // super in static functions
        var s = super;
        var x = () => super;
        var y = () => () => () => super;
    }
}

//// [superErrors.js]
function foo() {
    var x = super.;
    var y = () => super.;
    var z = () => () => () => super.;
}
class User {
    name = "Bob";
    sayHello() {
    }
}
class RegisteredUser extends User {
    name = "Frank";
    constructor() {
        super();
        function inner() {
            super.sayHello();
        }
        function inner2() {
            var x = () => super.sayHello();
        }
        (function () { return () => super.; })();
    }
    sayHello() {
        super.sayHello();
        function inner() {
            var x = () => super.sayHello();
        }
        (function () { return () => super.; })();
    }
    static staticFunction() {
        var s = super.;
        var x = () => super.;
        var y = () => () => () => super.;
    }
}
