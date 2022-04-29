// @allowJs: true
// @noEmit: true

// @filename: foo.js
class C {
  constructor () {
      this.p = 0;
  }
}

// @filename: bar.ts

(new C()).p = "string";
