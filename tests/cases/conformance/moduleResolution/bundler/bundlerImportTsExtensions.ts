// @moduleResolution: bundler
// @module: esnext
// @outDir: dist
// @allowJs: true
// @checkJs: true
// @outDir: out
// @noEmit: true,false
// @allowImportingTsExtensions: true,false
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
WOMP WOMP BINARY DATA

// @Filename: /project/e.ts
export {};

// @Filename: /project/e.txt
The letter e is for elephant
This poem is not about elephants
It is about the letter e
- Authored by GitHub Copilot, Nov 2022

// @Filename: /project/e.txt.ts
export {};

// @Filename: /project/main.ts
import {} from "./a";
import {} from "./a.js";
import {} from "./a.ts";

import {} from "./b";
import {} from "./b.js";
import {} from "./b.ts";
import {} from "./b.d.ts";
import type {} from "./b.d.ts";

import {} from "./c.ts";
import {} from "./c.tsx";

import {} from "./d";
import {} from "./d/index";
import {} from "./d/index.ts";

// These should not resolve, but preventing them has
// relatively little utility compared to the cost of
// the filesystem hits.
import {} from "./e";
import {} from "./e.txt";

// @Filename: /project/types.d.ts
import {} from "./a.ts";
import {} from "./a.d.ts";
import type {} from "./a.d.ts";