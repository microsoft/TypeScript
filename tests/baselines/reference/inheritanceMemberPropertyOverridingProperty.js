//// [tests/cases/compiler/inheritanceMemberPropertyOverridingProperty.ts] ////

//// [inheritanceMemberPropertyOverridingProperty.ts]
class a {
    x: () => string;
}

class b extends a {
    x: () => string;
}

//// [inheritanceMemberPropertyOverridingProperty.js]
class a {
}
class b extends a {
}
