//// [tests/cases/compiler/inheritanceStaticFuncOverridingAccessorOfFuncType.ts] ////

//// [inheritanceStaticFuncOverridingAccessorOfFuncType.ts]
class a {
    static get x(): () => string {
        return null;
    }
}

class b extends a {
    static x() {
        return "20";
    }
}

//// [inheritanceStaticFuncOverridingAccessorOfFuncType.js]
class a {
    static get x() {
        return null;
    }
}
class b extends a {
    static x() {
        return "20";
    }
}
