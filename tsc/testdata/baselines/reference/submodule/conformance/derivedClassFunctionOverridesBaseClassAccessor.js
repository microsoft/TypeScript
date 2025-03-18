//// [tests/cases/conformance/classes/members/inheritanceAndOverriding/derivedClassFunctionOverridesBaseClassAccessor.ts] ////

//// [derivedClassFunctionOverridesBaseClassAccessor.ts]
class Base {
    get x() {
        return 1;
    }
    set x(v) {
    }
}

// error
class Derived extends Base {
    x() {
        return 1;
    }
}

//// [derivedClassFunctionOverridesBaseClassAccessor.js]
class Base {
    get x() {
        return 1;
    }
    set x(v) {
    }
}
class Derived extends Base {
    x() {
        return 1;
    }
}
