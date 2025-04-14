/// <reference path="fourslash.ts" />

// repro from #52263

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "skipDefaultLibCheck": false
////    }
////}

// @Filename: /a.ts
////export const x = 0;

// @Filename: /b.ts
////// some comment
////
/////// <reference lib="es2017.string" />
////
////const y = x + 1;

// @Filename: /c.ts
////// some comment
////
/////// <reference path="jquery-1.8.3.js" />
////
////const y = x + 1;

// @Filename: /d.ts
////// some comment
////
/////// <reference types="node" />
////
////const y = x + 1;

// @Filename: /e.ts
////// some comment
////
/////// <reference no-default-lib="true" />
////
////const y = x + 1;

// @Filename: /f.ts
////// some comment
////
/////// <amd-module name="NamedModule" />
////
////const y = x + 1;

// @Filename: /g.ts
////// some comment
////
/////// <amd-dependency path="legacy/moduleA" name="moduleA" />
////
////const y = x + 1;

goTo.file("/b.ts");
verify.importFixAtPosition([
`// some comment

/// <reference lib="es2017.string" />

import { x } from "./a";

const y = x + 1;`,
]);

goTo.file("/c.ts");
verify.importFixAtPosition([
`// some comment

/// <reference path="jquery-1.8.3.js" />

import { x } from "./a";

const y = x + 1;`,
]);

goTo.file("/d.ts");
verify.importFixAtPosition([
`// some comment

/// <reference types="node" />

import { x } from "./a";

const y = x + 1;`,
]);

goTo.file("/e.ts");

verify.importFixAtPosition([
`// some comment

/// <reference no-default-lib="true" />

import { x } from "./a";

const y = x + 1;`,
]);

goTo.file("/f.ts");
verify.importFixAtPosition([
`// some comment

/// <amd-module name="NamedModule" />

import { x } from "./a";

const y = x + 1;`,
]);

goTo.file("/g.ts");
verify.importFixAtPosition([
`// some comment

/// <amd-dependency path="legacy/moduleA" name="moduleA" />

import { x } from "./a";

const y = x + 1;`,
]);
