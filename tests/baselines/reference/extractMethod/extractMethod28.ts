// ==ORIGINAL==
class C {
    M1() { }
    M2() {
        return 1;
    }
    M3() { }
    constructor() { }
}
// ==SCOPE::method in class 'C'==
class C {
    M1() { }
    M2() {
        return this.newFunction();
    }
    private newFunction() {
        return 1;
    }

    M3() { }
    constructor() { }
}
// ==SCOPE::function in global scope==
class C {
    M1() { }
    M2() {
        return newFunction();
    }
    M3() { }
    constructor() { }
}
function newFunction() {
    return 1;
}
