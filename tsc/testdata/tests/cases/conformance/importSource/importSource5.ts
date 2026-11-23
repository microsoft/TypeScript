// @module: esnext
// @target: esnext

// @filename: a.ts
export default 1;

// @filename: b.ts
import.source;
(import.source)("./a.js");
Function(import.source);
import.source.unknown;

import.source();
import.source("./a.js", {}, {});
import.source?.("./a.js");
import.source<string>("./a.js");
import.source(...["./a.js"]);

// @filename: c.ts
new import.source("./a.js");

// @filename: d.ts
new import.source("./a.js").a;

// @filename: e.ts
typeof import.source;

// @filename: f.ts
import.a("./a.js");
