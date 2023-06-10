//// [tests/cases/compiler/classFieldSuperNotAccessible.ts] ////

//// [classFieldSuperNotAccessible.ts]
class T {
    field = () => {}
}
class T2 extends T {
    f() {
        super.field()
        //    ~~~~~ error here
    }
}

new T2().f()


//// [classFieldSuperNotAccessible.js]
class T {
    field = () => { };
}
class T2 extends T {
    f() {
        super.field();
        //    ~~~~~ error here
    }
}
new T2().f();
