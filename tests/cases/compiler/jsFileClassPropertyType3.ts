// @allowJs: true
// @noEmit: true

// @filename: foo.js
class C {
    constructor() {
        if (cond) {
            this.p = null;
        }
        else {
            this.p = 0;
        }
    }
}

// @filename: bar.ts

(new C()).p = "string"; // Error
