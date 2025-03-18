//// [tests/cases/compiler/collisionSuperAndParameter1.ts] ////

//// [collisionSuperAndParameter1.ts]
class Foo {
}

class Foo2 extends Foo {
    x() {
        var lambda = (_super: number) => { // Error 
        }
    }
}

//// [collisionSuperAndParameter1.js]
class Foo {
}
class Foo2 extends Foo {
    x() {
        var lambda = (_super) => {
        };
    }
}
