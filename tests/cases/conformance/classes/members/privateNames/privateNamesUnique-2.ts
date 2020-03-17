// @target: es2015
// @filename: a.ts
export class Foo {
    #x;
    copy(other: import("./b").Foo) {
        other.#x; // error
    }
}
    
// @filename: b.ts
export class Foo {
    #x;
}

// @filename: main.ts
import { Foo as A } from "./a";
import { Foo as B } from "./b";

const a = new A();
const b = new B();
a.copy(b); // error
