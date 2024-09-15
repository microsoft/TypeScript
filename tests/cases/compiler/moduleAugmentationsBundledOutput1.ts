// @target: es5
// @module: amd
// @declaration: true
// @outFile: out.js

// @filename: m1.ts
export class Cls {
}

// @filename: m2.ts
import {Cls} from "./m1";
(<any>Cls.prototype).foo = function() { return 1; };
(<any>Cls.prototype).bar = function() { return "1"; };

declare module "./m1" {
    interface Cls {
        foo(): number;
    }
}

declare module "./m1" {
    interface Cls {
        bar(): string;
    }
}

// @filename: m3.ts
export class C1 { x: number }
export class C2 { x: string }

// @filename: m4.ts
import {Cls} from "./m1";
import {C1, C2} from "./m3";
(<any>Cls.prototype).baz1 = function() { return undefined };
(<any>Cls.prototype).baz2 = function() { return undefined };

declare module "./m1" {
    interface Cls {
        baz1(): C1;
    }
}

declare module "./m1" {
    interface Cls {
        baz2(): C2;
    }
}

// @filename: test.ts
import { Cls } from "./m1";
import "m2";
import "m4";
let c: Cls;
c.foo().toExponential();
c.bar().toLowerCase();
c.baz1().x.toExponential();
c.baz2().x.toLowerCase();
