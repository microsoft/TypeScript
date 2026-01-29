//// [tests/cases/compiler/inheritanceMemberFuncOverridingAccessor.ts] ////

//// [inheritanceMemberFuncOverridingAccessor.ts]
class a {
    get x() {
        return "20";
    }
    set x(aValue: string) {

    }
}

class b extends a {
    x() {
        return "20";
    }
}

//// [inheritanceMemberFuncOverridingAccessor.js]
class a {
    get x() {
        return "20";
    }
    set x(aValue) {
    }
}
class b extends a {
    x() {
        return "20";
    }
}
