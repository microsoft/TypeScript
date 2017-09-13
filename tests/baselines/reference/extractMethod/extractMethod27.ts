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
        return this.newFunction();
    }
    constructor() { }
    private newFunction() {
        return 1;
    }

    M3() { }
}
// ==SCOPE::function in global scope==
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
