// ==ORIGINAL==
class C {
    M1() { }
    M2() {
        return 1;
    }
    constructor() { }
    M3() { }
}
// ==SCOPE::class 'C'==
class C {
    M1() { }
    M2() {
        return this.newFunction();
    }
    constructor() { }
    private newFunction() {
        return 1;
    }

    M3() { }
}
// ==SCOPE::global scope==
class C {
    M1() { }
    M2() {
        return newFunction();
    }
    constructor() { }
    M3() { }
}
function newFunction() {
    return 1;
}
