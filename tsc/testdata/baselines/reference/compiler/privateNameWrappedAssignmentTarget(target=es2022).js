//// [tests/cases/compiler/privateNameWrappedAssignmentTarget.ts] ////

//// [privateNameWrappedAssignmentTarget.ts]
// A private name target wrapped in parentheses, `!`, `as`, `satisfies` or a type assertion is
// still a reference, and must be lowered like the bare target.

declare function other(): C;

class C {
    #x: any = 0;
    static #s: any = 0;
    get #a(): any { return 0; }
    set #a(v: any) {}

    destructuring(arr: any[], obj: any) {
        [(this.#x)] = arr;
        [this.#x!] = arr;
        [(this.#x as any)] = arr;
        [(this.#x satisfies any)] = arr;
        [(<any>this.#x)] = arr;
        [((this.#x))] = arr;
        ({ a: (this.#x) } = obj);
        ({ a: this.#x! } = obj);
        ({ a: (this.#x as any) } = obj);
        [(this.#x) = 1] = arr;
        ({ a: (this.#x as any) = 2 } = obj);
        [, ...(this.#x)] = arr;
        ({ ...(this.#x as any) } = obj);
        [[(this.#x)]] = arr;
        [(other().#x)] = arr;
        [(C.#s)] = arr;
        ({ a: (this.#a as any) } = obj);
    }

    update() {
        (this.#x as any)++;
        --(this.#x as any);
        this.#x!++;
        ++this.#x!;
        (this.#x satisfies any)--;
        (<any>this.#x)++;
        ((this.#x) as any)++;
        const v = (this.#x as any)++;
        (other().#x as any)++;
        (C.#s as any)++;
        (this.#a as any)++;
    }
}


//// [privateNameWrappedAssignmentTarget.js]
"use strict";
// A private name target wrapped in parentheses, `!`, `as`, `satisfies` or a type assertion is
// still a reference, and must be lowered like the bare target.
class C {
    #x = 0;
    static #s = 0;
    get #a() { return 0; }
    set #a(v) { }
    destructuring(arr, obj) {
        [(this.#x)] = arr;
        [this.#x] = arr;
        [this.#x] = arr;
        [this.#x] = arr;
        [this.#x] = arr;
        [((this.#x))] = arr;
        ({ a: (this.#x) } = obj);
        ({ a: this.#x } = obj);
        ({ a: this.#x } = obj);
        [(this.#x) = 1] = arr;
        ({ a: this.#x = 2 } = obj);
        [, ...(this.#x)] = arr;
        ({ ...this.#x } = obj);
        [[(this.#x)]] = arr;
        [(other().#x)] = arr;
        [(C.#s)] = arr;
        ({ a: this.#a } = obj);
    }
    update() {
        this.#x++;
        --this.#x;
        this.#x++;
        ++this.#x;
        this.#x--;
        this.#x++;
        (this.#x)++;
        const v = this.#x++;
        other().#x++;
        C.#s++;
        this.#a++;
    }
}
