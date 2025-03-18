//// [tests/cases/compiler/inheritanceStaticFunctionOverridingInstanceProperty.ts] ////

//// [inheritanceStaticFunctionOverridingInstanceProperty.ts]
class a {
    x: string;
}

class b extends a {
    static x() {
        return new b().x;
    }
}

//// [inheritanceStaticFunctionOverridingInstanceProperty.js]
class a {
    x;
}
class b extends a {
    static x() {
        return new b().x;
    }
}
