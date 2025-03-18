//// [tests/cases/compiler/inheritanceMemberFuncOverridingMethod.ts] ////

//// [inheritanceMemberFuncOverridingMethod.ts]
class a {
    x() {
        return "10";
    }
}

class b extends a {
    x() {
        return "20";
    }
}

//// [inheritanceMemberFuncOverridingMethod.js]
class a {
    x() {
        return "10";
    }
}
class b extends a {
    x() {
        return "20";
    }
}
