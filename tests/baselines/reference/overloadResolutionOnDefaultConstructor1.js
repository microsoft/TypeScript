//// [tests/cases/compiler/overloadResolutionOnDefaultConstructor1.ts] ////

//// [overloadResolutionOnDefaultConstructor1.ts]
class Bar {
    public clone() {
        return new Bar(0);
    }
}

//// [overloadResolutionOnDefaultConstructor1.js]
class Bar {
    clone() {
        return new Bar(0);
    }
}
