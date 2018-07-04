/// <reference path="fourslash.ts" />

// @moduleResolution: node
// @noLib: true
// @allowJs: true
// @checkJs: true
// @jsx: preserve

// @Filename: /a.js
////export function a() {}

// @Filename: /b.ts
////export function b() {}

// @Filename: /c.jsx
////export function c() {}

// @Filename: /d.tsx
////export function d() {}

// @Filename: /normalExt.ts
////a;
////b;
////c;
////d;

// @Filename: /includeExt.ts
////a;
////b;
////c;
////d;

// @Filename: /includeExt.js
////a;
////b;
////c;
////d;


goTo.file("/normalExt.ts");
verify.importFixAtPosition([
    `import { a } from "./a";

a;
b;
c;
d;`, `import { b } from "./b";

a;
b;
c;
d;`, `import { c } from "./c";

a;
b;
c;
d;`, `import { d } from "./d";

a;
b;
c;
d;`]);

goTo.file("/includeExt.ts");
verify.importFixAtPosition([
    `import { a } from "./a.js";

a;
b;
c;
d;`, `import { b } from "./b.js";

a;
b;
c;
d;`, `import { c } from "./c.jsx";

a;
b;
c;
d;`, `import { d } from "./d.jsx";

a;
b;
c;
d;`], /* errorCode */ undefined, {
        includeExtensionInImports: true
    });

goTo.file("/includeExt.js");
verify.importFixAtPosition([
    `import { a } from "./a.js";

a;
b;
c;
d;`, `import { b } from "./b.js";

a;
b;
c;
d;`, `import { c } from "./c.jsx";

a;
b;
c;
d;`, `import { d } from "./d.jsx";

a;
b;
c;
d;`], /* errorCode */ undefined, {
        includeExtensionInImports: true
    });