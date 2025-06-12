//// [tests/cases/compiler/emitThisInSuperMethodCall.ts] ////

//// [emitThisInSuperMethodCall.ts]
class User {
    sayHello() {
    }
}

class RegisteredUser extends User {
    f() {
        () => {
            function inner() {
                super.sayHello();
            }
        };
    }
    g() {
        function inner() {
            () => {
                super.sayHello();
            }
        }
    }
    h() {
        function inner() {
            super.sayHello();
        }
    }
}


//// [emitThisInSuperMethodCall.js]
class User {
    sayHello() {
    }
}
class RegisteredUser extends User {
    f() {
        () => {
            function inner() {
                super.sayHello();
            }
        };
    }
    g() {
        function inner() {
            () => {
                super.sayHello();
            };
        }
    }
    h() {
        function inner() {
            super.sayHello();
        }
    }
}
