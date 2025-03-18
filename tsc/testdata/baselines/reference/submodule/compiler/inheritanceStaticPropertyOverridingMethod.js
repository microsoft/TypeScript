//// [tests/cases/compiler/inheritanceStaticPropertyOverridingMethod.ts] ////

//// [inheritanceStaticPropertyOverridingMethod.ts]
class a {
    static x() {
        return "20";
    }
}

class b extends a {
    static x: string;
}

//// [inheritanceStaticPropertyOverridingMethod.js]
class a {
    static x() {
        return "20";
    }
}
class b extends a {
    static x;
}
