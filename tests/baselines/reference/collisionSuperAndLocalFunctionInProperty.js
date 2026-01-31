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
    constructor() {
        this.prop1 = {
            doStuff: () => {
                function _super() {
                }
            }
        };
    }
}
class b extends Foo {
    constructor() {
        super(...arguments);
        this.prop2 = {
            doStuff: () => {
                function _super() {
                }
            }
        };
    }
}
