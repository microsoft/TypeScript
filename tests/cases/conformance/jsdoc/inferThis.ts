// @noEmit: true
// @allowJs: true
// @checkJs: true
// @filename: /a.js

export class C {
    /**
     * @template T
     * @this {T}
     * @return {T}
     */
    static a() {
        return this;
    }

    /**
     * @template T
     * @this {T}
     * @return {T}
     */
    b() {
        return this;
    }
}

const a = C.a();
a; // typeof C

const c = new C();
const b = c.b();
b; // C
