// @noEmit: true
// @allowJs: true
// @checkJs: true
// @strict: true
// @Filename: bug25926.js

/** @type {{ a(): void; b?(n: number): number; }} */
const o1 = {
    a() {
        this.b = n => n;
    }
};

/** @type {{ d(): void; e?(n: number): number; f?(n: number): number; g?: number }} */
const o2 = {
    d() {
        this.e = this.f = m => this.g || m;
    }
};

