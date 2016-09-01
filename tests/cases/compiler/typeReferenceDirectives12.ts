// @noImplicitReferences: true
// @declaration: true
// @typeRoots: /types
// @traceResolution: true
// @out: output.js

// @currentDirectory: /

// @filename: /types/lib/index.d.ts

interface Lib { x }

// @filename: /main.ts
export class Cls {
    x
}

// @filename: /mod1.ts
/// <reference types="lib" />

import {Cls} from "./main";
Cls.prototype.foo = function() { return undefined; }

declare module "./main" {
    interface Cls {
        foo(): Lib;
    }
    namespace Cls {
        function bar(): Lib;
    }
}

// @filename: /mod2.ts
import { Cls } from "./main";
import "./mod1";

export const cls = Cls;
export const foo = new Cls().foo();
export const bar = Cls.bar();