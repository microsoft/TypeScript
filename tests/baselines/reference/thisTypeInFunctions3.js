//// [tests/cases/conformance/types/thisType/thisTypeInFunctions3.ts] ////

//// [thisTypeInFunctions3.ts]
declare class Base {
    check<TProp extends this>(prop: TProp): boolean;
}

class Test extends Base {
    m() {
        this.check(this);
    }
}


//// [thisTypeInFunctions3.js]
class Test extends Base {
    m() {
        this.check(this);
    }
}
