// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /test.js
module.exports = {
  a: "ok"
};

// @Filename: /index.ts
import { a } from "./test";

declare module "./test" {
  export const a: number;
}

a.toFixed();
