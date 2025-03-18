//// [tests/cases/compiler/inheritanceStaticFuncOverridingPropertyOfFuncType.ts] ////

//// [inheritanceStaticFuncOverridingPropertyOfFuncType.ts]
class a {
    static x: () => string;
}

class b extends a {
    static x() {
        return "20";
    }
}

//// [inheritanceStaticFuncOverridingPropertyOfFuncType.js]
class a {
    static x;
}
class b extends a {
    static x() {
        return "20";
    }
}
