//// [tests/cases/compiler/collisionSuperAndLocalFunctionInConstructor.ts] ////

//// [collisionSuperAndLocalFunctionInConstructor.ts]
function _super() { // No error
}
class Foo {
    constructor() {
        function _super() { // No error
        }
    }
}
class b extends Foo {
    constructor() {
        super();
        function _super() { // Should be error
        }
    }
}
class c extends Foo {
    constructor() {
        super();
        var x = () => {
            function _super() { // Should be error
            }
        }
    }
}

//// [collisionSuperAndLocalFunctionInConstructor.js]
function _super() {
}
class Foo {
    constructor() {
        function _super() {
        }
    }
}
class b extends Foo {
    constructor() {
        super();
        function _super() {
        }
    }
}
class c extends Foo {
    constructor() {
        super();
        var x = () => {
            function _super() {
            }
        };
    }
}
