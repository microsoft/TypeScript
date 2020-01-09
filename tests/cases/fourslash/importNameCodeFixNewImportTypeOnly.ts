/// <reference path="fourslash.ts" />

// @target: esnext

// @Filename: /a.ts
////export interface Car {}

// @Filename: /b.ts
////function drive(car: /**/Car) {}

goTo.file("/b.ts");
verify.importFixAtPosition([`import type { Car } from "./a";

function drive(car: Car) {}`]);
