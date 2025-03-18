//// [tests/cases/compiler/inheritanceStaticPropertyOverridingProperty.ts] ////

//// [inheritanceStaticPropertyOverridingProperty.ts]
class a {
    static x: () => string;
}

class b extends a {
    static x: () => string;
}

//// [inheritanceStaticPropertyOverridingProperty.js]
class a {
    static x;
}
class b extends a {
    static x;
}
