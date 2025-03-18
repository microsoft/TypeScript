//// [tests/cases/compiler/inheritanceStaticFuncOverridingProperty.ts] ////

//// [inheritanceStaticFuncOverridingProperty.ts]
class a {
    static x: string;
}

class b extends a {
    static x() {
        return "20";
    }
}

//// [inheritanceStaticFuncOverridingProperty.js]
class a {
    static x;
}
class b extends a {
    static x() {
        return "20";
    }
}
