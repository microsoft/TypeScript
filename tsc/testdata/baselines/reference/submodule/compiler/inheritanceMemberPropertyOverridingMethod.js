//// [tests/cases/compiler/inheritanceMemberPropertyOverridingMethod.ts] ////

//// [inheritanceMemberPropertyOverridingMethod.ts]
class a {
    x() {
        return "20";
    }
}

class b extends a {
    x: () => string;
}

//// [inheritanceMemberPropertyOverridingMethod.js]
class a {
    x() {
        return "20";
    }
}
class b extends a {
    x;
}
