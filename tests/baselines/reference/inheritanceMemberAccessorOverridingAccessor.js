//// [tests/cases/compiler/inheritanceMemberAccessorOverridingAccessor.ts] ////

//// [inheritanceMemberAccessorOverridingAccessor.ts]
class a {
    get x() {
        return "20";
    }
    set x(aValue: string) {

    }
}

class b extends a {
    get x() {
        return "20";
    }
    set x(aValue: string) {

    }
}

//// [inheritanceMemberAccessorOverridingAccessor.js]
class a {
    get x() {
        return "20";
    }
    set x(aValue) {
    }
}
class b extends a {
    get x() {
        return "20";
    }
    set x(aValue) {
    }
}
