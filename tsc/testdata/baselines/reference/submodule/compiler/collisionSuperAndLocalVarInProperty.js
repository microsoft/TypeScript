//// [tests/cases/compiler/collisionSuperAndLocalVarInProperty.ts] ////

//// [collisionSuperAndLocalVarInProperty.ts]
var _super = 10; // No Error
class Foo {
   public prop1 = {
        doStuff: () => {
            var _super = 10; // No error
        }
    }
    public _super = 10; // No error
}
class b extends Foo {
    public prop2 = {
        doStuff: () => {
            var _super = 10; // Should be error 
        }
    }
    public _super = 10; // No error
}

//// [collisionSuperAndLocalVarInProperty.js]
var _super = 10; // No Error
class Foo {
    prop1 = {
        doStuff: () => {
            var _super = 10; // No error
        }
    };
    _super = 10; // No error
}
class b extends Foo {
    prop2 = {
        doStuff: () => {
            var _super = 10; // Should be error 
        }
    };
    _super = 10; // No error
}
