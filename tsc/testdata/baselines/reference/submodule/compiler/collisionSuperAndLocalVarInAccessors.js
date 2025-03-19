//// [tests/cases/compiler/collisionSuperAndLocalVarInAccessors.ts] ////

//// [collisionSuperAndLocalVarInAccessors.ts]
var _super = 10; // No Error
class Foo {
    get prop1(): number {
        var _super = 10; // No error
        return 10;
    }
    set prop1(val: number) {
        var _super = 10; // No error
    }
}
class b extends Foo {
    get prop2(): number {
        var _super = 10; // Should be error
        return 10;
    }
    set prop2(val: number) {
        var _super = 10; // Should be error
    }
}
class c extends Foo {
    get prop2(): number {
        var x = () => {
            var _super = 10; // Should be error
        }
        return 10;
    }
    set prop2(val: number) {
        var x = () => {
            var _super = 10; // Should be error
        }
    }
}

//// [collisionSuperAndLocalVarInAccessors.js]
var _super = 10; // No Error
class Foo {
    get prop1() {
        var _super = 10; // No error
        return 10;
    }
    set prop1(val) {
        var _super = 10; // No error
    }
}
class b extends Foo {
    get prop2() {
        var _super = 10; // Should be error
        return 10;
    }
    set prop2(val) {
        var _super = 10; // Should be error
    }
}
class c extends Foo {
    get prop2() {
        var x = () => {
            var _super = 10; // Should be error
        };
        return 10;
    }
    set prop2(val) {
        var x = () => {
            var _super = 10; // Should be error
        };
    }
}
