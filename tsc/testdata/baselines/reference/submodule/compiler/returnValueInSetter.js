//// [tests/cases/compiler/returnValueInSetter.ts] ////

//// [returnValueInSetter.ts]
class f {
    set x(value) {
        return null; // Should be an error
    }
}



//// [returnValueInSetter.js]
class f {
    set x(value) {
        return null;
    }
}
