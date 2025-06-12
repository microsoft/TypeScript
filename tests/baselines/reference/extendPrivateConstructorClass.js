//// [tests/cases/compiler/extendPrivateConstructorClass.ts] ////

//// [extendPrivateConstructorClass.ts]
declare namespace abc {
    class XYZ {
        private constructor();
    }
}

class C extends abc.XYZ {
}


//// [extendPrivateConstructorClass.js]
class C extends abc.XYZ {
}
