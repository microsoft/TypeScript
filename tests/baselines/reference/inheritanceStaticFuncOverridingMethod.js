//// [tests/cases/compiler/inheritanceStaticFuncOverridingMethod.ts] ////

//// [inheritanceStaticFuncOverridingMethod.ts]
class a {
    static x() {
        return "10";
    }
}

class b extends a {
    static x() {
        return "20";
    }
}

//// [inheritanceStaticFuncOverridingMethod.js]
class a {
    static x() {
        return "10";
    }
}
class b extends a {
    static x() {
        return "20";
    }
}
