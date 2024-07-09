//// [tests/cases/conformance/externalModules/typeOnly/importSpecifiers1.ts] ////

//// [mod.ts]
export const as = 0;
export const type = 0;
export const something = 0;

//// [a.ts]
import { type } from "./mod.js";
import { type as } from "./mod.js";
type;
as; // Error (used in emitting position)

//// [b.ts]
import { type as as } from "./mod.js";
type; // Error (cannot resolve name)
as;

//// [c.ts]
import { type as as as } from "./mod.js";
type; // Error (cannot resolve name)
as; // Error (used in emitting position)

//// [d.ts]
import { type as as as as } from "./mod.js"; // Error

//// [e.ts]
import { type type as as } from "./mod.js";
import { type as type } from "./mod.js";
type;
as; // Error (used in emitting position)

//// [f.ts]
import { type import } from "./mod.js"; // Error
import { type as export } from "./mod.js"; // Error
import { type as as export } from "./mod.js"; // Error
import { type something } from "./mod.js";
import { type something as s } from "./mod.js";
type; // Error (cannot resolve name)
as; // Error (cannot resolve name)
something; // Error (used in emitting position)
s; // Error (used in emitting position)

//// [g.ts]
import type { type something } from "./mod.js"; // Error


//// [mod.js]
export var as = 0;
export var type = 0;
export var something = 0;
//// [a.js]
import { type } from "./mod.js";
type;
as; // Error (used in emitting position)
//// [b.js]
import { type as as } from "./mod.js";
type; // Error (cannot resolve name)
as;
//// [c.js]
type; // Error (cannot resolve name)
as; // Error (used in emitting position)
export {};
//// [d.js]
export {};
//// [e.js]
import { type as type } from "./mod.js";
type;
as; // Error (used in emitting position)
//// [f.js]
type; // Error (cannot resolve name)
as; // Error (cannot resolve name)
something; // Error (used in emitting position)
s; // Error (used in emitting position)
export {};
//// [g.js]
export {};


//// [mod.d.ts]
export declare const as = 0;
export declare const type = 0;
export declare const something = 0;
//// [a.d.ts]
export {};
//// [b.d.ts]
export {};
//// [c.d.ts]
export {};
//// [d.d.ts]
export {};
//// [e.d.ts]
export {};
//// [f.d.ts]
export {};
//// [g.d.ts]
export {};
