//// [tests/cases/conformance/classes/members/privateNames/privateNamesUnique-2.ts] ////

//// [a.ts]
export class Foo {
    #x;
    copy(other: import("./b").Foo) {
        other.#x; // error
    }
}
    
//// [b.ts]
export class Foo {
    #x;
}

//// [main.ts]
import { Foo as A } from "./a";
import { Foo as B } from "./b";

const a = new A();
const b = new B();
a.copy(b); // error


//// [b.js]
export class Foo {
    #x;
}
//// [a.js]
export class Foo {
    #x;
    copy(other) {
        other.#x;
    }
}
//// [main.js]
import { Foo as A } from "./a";
import { Foo as B } from "./b";
const a = new A();
const b = new B();
a.copy(b);
