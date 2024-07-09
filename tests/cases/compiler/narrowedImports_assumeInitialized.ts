// @strictNullChecks: true

// @Filename: /a.d.ts
declare namespace a {
    export const x: number;
}
export = a;

// @Filename: /b.ts
import a = require("./a");
a.x;
