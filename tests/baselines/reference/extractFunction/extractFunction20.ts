// ==ORIGINAL==
const _ = class {
    a() {
        /*[#|*/let a1 = { x: 1 };
        return a1.x + 10;/*|]*/
    }
}
// ==SCOPE::Extract to inner function in method 'a'==
const _ = class {
    a() {
        return /*RENAME*/newFunction();

        function newFunction() {
            let a1 = { x: 1 };
            return a1.x + 10;
        }
    }
}
// ==SCOPE::Extract to method in anonymous class expression==
const _ = class {
    a() {
        return this./*RENAME*/newMethod();
    }

    private newMethod() {
        let a1 = { x: 1 };
        return a1.x + 10;
    }
}
// ==SCOPE::Extract to function in global scope==
const _ = class {
    a() {
        return /*RENAME*/newFunction();
    }
}

function newFunction() {
    let a1 = { x: 1 };
    return a1.x + 10;
}
