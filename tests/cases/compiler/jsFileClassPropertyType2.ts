// @allowJs: true
// @noEmit: true

// @filename: foo.js
class C {
    constructor() {
      /** @type {number[]}*/
      this.p = [];
  }
}

// @filename: bar.ts

(new C()).p.push("string");
