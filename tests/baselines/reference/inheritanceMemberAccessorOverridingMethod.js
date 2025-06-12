//// [tests/cases/compiler/inheritanceMemberAccessorOverridingMethod.ts] ////

//// [inheritanceMemberAccessorOverridingMethod.ts]
class a {
    x() {
        return "20";
    }
}

class b extends a {
    get x() {
        return () => "20";
    }
    set x(aValue) {
        
    }
}

//// [inheritanceMemberAccessorOverridingMethod.js]
class a {
    x() {
        return "20";
    }
}
class b extends a {
    get x() {
        return () => "20";
    }
    set x(aValue) {
    }
}
