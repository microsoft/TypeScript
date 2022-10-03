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