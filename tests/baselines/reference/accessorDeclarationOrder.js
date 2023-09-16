//// [tests/cases/compiler/accessorDeclarationOrder.ts] ////

//// [accessorDeclarationOrder.ts]
class C1 {
    #name: string;

    public get name() {
        return this.#name;
    }

    private set name(name: string) {
        this.#name = name;
    }
}

class C2 {
    #name: string;

    private set name(name: string) {
        this.#name = name;
    }

    public get name() {
        return this.#name;
    }
}

const c1 = new C1();
const c2 = new C2();


// no error
c1.name;

// no error
c2.name;


//// [accessorDeclarationOrder.js]
class C1 {
    #name;
    get name() {
        return this.#name;
    }
    set name(name) {
        this.#name = name;
    }
}
class C2 {
    #name;
    set name(name) {
        this.#name = name;
    }
    get name() {
        return this.#name;
    }
}
const c1 = new C1();
const c2 = new C2();
// no error
c1.name;
// no error
c2.name;
