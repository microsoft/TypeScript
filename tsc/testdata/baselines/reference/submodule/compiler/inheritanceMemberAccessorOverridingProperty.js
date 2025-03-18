//// [tests/cases/compiler/inheritanceMemberAccessorOverridingProperty.ts] ////

//// [inheritanceMemberAccessorOverridingProperty.ts]
class a {
    x: string;
}

class b extends a {
    get x() {
        return "20";
    }
    set x(aValue: string) {

    }
}

//// [inheritanceMemberAccessorOverridingProperty.js]
class a {
    x;
}
class b extends a {
    get x() {
        return "20";
    }
    set x(aValue) {
    }
}
