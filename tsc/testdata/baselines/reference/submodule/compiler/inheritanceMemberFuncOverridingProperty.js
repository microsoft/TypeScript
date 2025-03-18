//// [tests/cases/compiler/inheritanceMemberFuncOverridingProperty.ts] ////

//// [inheritanceMemberFuncOverridingProperty.ts]
class a {
    x: () => string;
}

class b extends a {
    x() {
        return "20";
    }
}

//// [inheritanceMemberFuncOverridingProperty.js]
class a {
    x;
}
class b extends a {
    x() {
        return "20";
    }
}
