// @moduleResolution: minimal
// @outDir: dist
// @noEmit: true,false
// @traceResolution: true

// @Filename: /project/a.ts
export {};

// @Filename: /project/b.ts
export {};

// @Filename: /project/b.js
export {};

// @Filename: /project/b.d.ts
export {};

// @Filename: /project/c.ts
export {};

// @Filename: /project/c.tsx
export {};

// @Filename: /project/d/index.ts
export {};

// @Filename: /project/e
export {};

// @Filename: /project/main.ts
import {} from "./a";
import {} from "./a.js";
import {} from "./a.ts";

import {} from "./b";
import {} from "./b.js";
import {} from "./b.ts";
import {} from "./b.d.ts";

import {} from "./c.ts";
import {} from "./c.tsx";

import {} from "./d";
import {} from "./d/index";
import {} from "./d/index.ts";

import {} from "./e";
