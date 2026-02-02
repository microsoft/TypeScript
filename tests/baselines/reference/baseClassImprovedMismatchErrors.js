//// [tests/cases/compiler/baseClassImprovedMismatchErrors.ts] ////

//// [baseClassImprovedMismatchErrors.ts]
class Base {
    n: Base | string;
    fn() {
        return 10;
    }
}
class Derived extends Base {
    n: Derived | string;
    fn() {
        return 10 as number | string;
    }
}
class DerivedInterface implements Base {
    n: DerivedInterface | string;
    fn() {
        return 10 as number | string;
    }
}

//// [baseClassImprovedMismatchErrors.js]
class Base {
    fn() {
        return 10;
    }
}
class Derived extends Base {
    fn() {
        return 10;
    }
}
class DerivedInterface {
    fn() {
        return 10;
    }
}
