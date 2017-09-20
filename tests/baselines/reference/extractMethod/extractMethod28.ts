// ==ORIGINAL==
class C {
    M1() { }
    M2() {
        return 1;
    }
    M3() { }
    constructor() { }
}
// ==SCOPE::class 'C'==
class C {
    M1() { }
    M2() {
        return this./*RENAME*/newFunction();
    }
    private newFunction() {
        return 1;
    }

    M3() { }
    constructor() { }
}
// ==SCOPE::global scope==
class C {
    M1() { }
    M2() {
        return /*RENAME*/newFunction();
    }
    M3() { }
    constructor() { }
}
function newFunction() {
    return 1;
}
