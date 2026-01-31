//// [tests/cases/compiler/inheritanceStaticAccessorOverridingAccessor.ts] ////

//// [inheritanceStaticAccessorOverridingAccessor.ts]
class a {
    static get x() {
        return "20";
    }
    static set x(aValue: string) {

    }
}

class b extends a {
    static get x() {
        return "20";
    }
    static set x(aValue: string) {

    }
}

//// [inheritanceStaticAccessorOverridingAccessor.js]
class a {
    static get x() {
        return "20";
    }
    static set x(aValue) {
    }
}
class b extends a {
    static get x() {
        return "20";
    }
    static set x(aValue) {
    }
}
