// ==ORIGINAL==
class C {
    M1() { }
    M2() {
        return 1;
    }
    constructor() { }
    M3() { }
}
// ==SCOPE::method in class 'C'==
class C {
    M1() { }
    M2() {
        return this./*RENAME*/newFunction();
    }
    constructor() { }
    newFunction() {
        return 1;
    }

    M3() { }
}
// ==SCOPE::function in global scope==
class C {
    M1() { }
    M2() {
        return /*RENAME*/newFunction();
    }
    constructor() { }
    M3() { }
}
function newFunction() {
    return 1;
}
