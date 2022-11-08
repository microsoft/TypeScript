// @module: esnext
// @declaration: true

// @Filename: /mod.ts
export const as = 0;
export const type = 0;
export const something = 0;

// @Filename: /a.ts
import { type } from "./mod.js";
import { type as } from "./mod.js";
type;
as; // Error (used in emitting position)

// @Filename: /b.ts
import { type as as } from "./mod.js";
type; // Error (cannot resolve name)
as;

// @Filename: /c.ts
import { type as as as } from "./mod.js";
type; // Error (cannot resolve name)
as; // Error (used in emitting position)

// @Filename: /d.ts
import { type as as as as } from "./mod.js"; // Error

// @Filename: /e.ts
import { type type as as } from "./mod.js";
import { type as type } from "./mod.js";
type;
as; // Error (used in emitting position)

// @Filename: /f.ts
import { type import } from "./mod.js"; // Error
import { type as export } from "./mod.js"; // Error
import { type as as export } from "./mod.js"; // Error
import { type something } from "./mod.js";
import { type something as s } from "./mod.js";
type; // Error (cannot resolve name)
as; // Error (cannot resolve name)
something; // Error (used in emitting position)
s; // Error (used in emitting position)

// @Filename: /g.ts
import type { type something } from "./mod.js"; // Error
