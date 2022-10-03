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