//// [tests/cases/compiler/collisionSuperAndLocalFunctionInProperty.ts] ////

//// [collisionSuperAndLocalFunctionInProperty.ts]
function _super() { // No error
} 
class Foo {
   public prop1 = {
        doStuff: () => {
            function _super() { // No error
            } 
        }
   }
}
class b extends Foo {
    public prop2 = {
        doStuff: () => {
            function _super() { // error
            } 
        }
    }
}

//// [collisionSuperAndLocalFunctionInProperty.js]
function _super() {
}
class Foo {
    prop1 = {
        doStuff: () => {
            function _super() {
            }
        }
    };
}
class b extends Foo {
    prop2 = {
        doStuff: () => {
            function _super() {
            }
        }
    };
}
