//// [tests/cases/compiler/inheritanceMemberPropertyOverridingAccessor.ts] ////

//// [inheritanceMemberPropertyOverridingAccessor.ts]
class a {
    private __x: () => string;
    get x() {
        return this.__x;
    }
    set x(aValue: () => string) {
        this.__x = aValue;
    }
}

class b extends a {
    x: () => string;
}

//// [inheritanceMemberPropertyOverridingAccessor.js]
class a {
    __x;
    get x() {
        return this.__x;
    }
    set x(aValue) {
        this.__x = aValue;
    }
}
class b extends a {
    x;
}
