//// [tests/cases/compiler/collisionSuperAndLocalFunctionInMethod.ts] ////

//// [collisionSuperAndLocalFunctionInMethod.ts]
function _super() { // No error
} 
class Foo {
    x() {
        function _super() { // No error
        } 
    }
    _super() { // No error
    }
}
class b extends Foo {
    public foo() {
        function _super() { // should be error
        } 
    }
    _super() { // No Error
    }
}
class c extends Foo {
    public foo() {
        var x = () => {
            function _super() { // should be error
            } 
        }
    }
    _super() { // No error
    }
}

//// [collisionSuperAndLocalFunctionInMethod.js]
function _super() {
}
class Foo {
    x() {
        function _super() {
        }
    }
    _super() {
    }
}
class b extends Foo {
    foo() {
        function _super() {
        }
    }
    _super() {
    }
}
class c extends Foo {
    foo() {
        var x = () => {
            function _super() {
            }
        };
    }
    _super() {
    }
}
