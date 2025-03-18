//// [tests/cases/compiler/inheritanceStaticAccessorOverridingProperty.ts] ////

//// [inheritanceStaticAccessorOverridingProperty.ts]
class a {
    static x: string;
}

class b extends a {
    static get x() {
        return "20";
    }
    static set x(aValue: string) {

    }
}

//// [inheritanceStaticAccessorOverridingProperty.js]
class a {
    static x;
}
class b extends a {
    static get x() {
        return "20";
    }
    static set x(aValue) {
    }
}
