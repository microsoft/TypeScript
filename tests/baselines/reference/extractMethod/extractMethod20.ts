// ==ORIGINAL==
const _ = class {
    a() {
        let a1 = { x: 1 };
        return a1.x + 10;
    }
}
// ==SCOPE::method in anonymous class expression==
const _ = class {
    a() {
        return this./*RENAME*/newFunction();
    }

    private newFunction() {
        let a1 = { x: 1 };
        return a1.x + 10;
    }
}
// ==SCOPE::function in global scope==
const _ = class {
    a() {
        return /*RENAME*/newFunction();
    }
}
function newFunction() {
    let a1 = { x: 1 };
    return a1.x + 10;
}
