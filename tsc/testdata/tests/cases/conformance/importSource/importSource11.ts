// @module: esnext
// @target: esnext
// @allowJs: true
// @noEmit: true

// @filename: a.js
export default 1;
export const a = 2;

// @filename: b.js
import source * as a from "./a.js";

// @filename: c.js
import source { a } from "./a.js";

// @filename: d.js
import source a, { a as b } from "./a.js";

// @filename: e.js
import source "./a.js";

// @filename: f.js
import.source;
(import.source)("./a.js");
Function(import.source);
import.source.unknown;

import.source();
import.source("./a.js", {}, {});
import.source?.("./a.js");
import.source<string>("./a.js");
import.source(...["./a.js"]);

// @filename: g.js
new import.source("./a.js");

// @filename: h.js
typeof import.source;

// @filename: i.js
import.a("./a.js");

// @filename: j.js
import source a from "./a.js" with { type: "javascript" };
const b = import.source("./a.js", { with: { type: "javascript" } });
a;
b;

// @filename: k.js
const a = import.source("./a.js", { with: { type: "javascript" } });
a;

// @filename: l.js
import s\u006furce from "./a.js";
source;

// @filename: m.js
import.s\u006furce("./a.js");
