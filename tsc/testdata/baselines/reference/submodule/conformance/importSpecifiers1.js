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
export const as = 0;
export const type = 0;
export const something = 0;
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
import "./mod.js"; // Error
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
