//// [tests/cases/compiler/superInLambdas.ts] ////

//// [superInLambdas.ts]
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

        // super call in a constructor
        super.sayHello();

        // super call in a lambda in a constructor 
        var x = () => super.sayHello();
    }
    sayHello(): void {
        // super call in a method
        super.sayHello();

        // super call in a lambda in a method
       var x = () => super.sayHello();
    }
}
class RegisteredUser2 extends User {
    name: string = "Joe";
    constructor() {
        super();

        // super call in a nested lambda in a constructor 
        var x = () => () => () => super.sayHello();
    }
    sayHello(): void {
        // super call in a nested lambda in a method
        var x = () => () => () => super.sayHello();
    }
}

class RegisteredUser3 extends User {
    name: string = "Sam";
    constructor() {
        super();

        // super property in a nested lambda in a constructor 
        var superName = () => () => () => super.name;
    }
    sayHello(): void {
        // super property in a nested lambda in a method
        var superName = () => () => () => super.name;
    }
}

class RegisteredUser4 extends User {
    name: string = "Mark";
    constructor() {
        super();

        // super in a nested lambda in a constructor 
        var x = () => () => super;
    }
    sayHello(): void {
        // super in a nested lambda in a method
        var x = () => () => super;
    }
}

//// [superInLambdas.js]
class User {
    name = "Bob";
    sayHello() {
    }
}
class RegisteredUser extends User {
    name = "Frank";
    constructor() {
        super();
        super.sayHello();
        var x = () => super.sayHello();
    }
    sayHello() {
        super.sayHello();
        var x = () => super.sayHello();
    }
}
class RegisteredUser2 extends User {
    name = "Joe";
    constructor() {
        super();
        var x = () => () => () => super.sayHello();
    }
    sayHello() {
        var x = () => () => () => super.sayHello();
    }
}
class RegisteredUser3 extends User {
    name = "Sam";
    constructor() {
        super();
        var superName = () => () => () => super.name;
    }
    sayHello() {
        var superName = () => () => () => super.name;
    }
}
class RegisteredUser4 extends User {
    name = "Mark";
    constructor() {
        super();
        var x = () => () => super.;
    }
    sayHello() {
        var x = () => () => super.;
    }
}
