// @allowImportingTsExtensions: true
// @noEmit: true
// @moduleResolution: classic,node10,node16,nodenext,bundler
// @jsx: preserve
// @noTypesAndSymbols: true

// @Filename: /ts.ts
export {};

// @Filename: /tsx.tsx
export {};

// @Filename: /dts.d.ts
export {};

// @Filename: /b.ts
import {} from "./ts.js";
import {} from "./ts.ts";
import type {} from "./ts.d.ts";

import {} from "./tsx.js";
import {} from "./tsx.jsx";
import {} from "./tsx.ts";
import {} from "./tsx.tsx";
import type {} from "./tsx.d.ts";

import {} from "./dts.js";
import {} from "./dts.ts";
import type {} from "./dts.d.ts";

// @Filename: /c.ts
import {} from "./thisfiledoesnotexist.ts";
