//// [tests/cases/compiler/inheritanceStaticPropertyOverridingAccessor.ts] ////

//// [inheritanceStaticPropertyOverridingAccessor.ts]
class a {
    static get x(): () => string {
        return null;;
    }
    static set x(aValue: () => string) {
    }
}

class b extends a {
    static x: () => string;
}

//// [inheritanceStaticPropertyOverridingAccessor.js]
class a {
    static get x() {
        return null;
        ;
    }
    static set x(aValue) {
    }
}
class b extends a {
    static x;
}
