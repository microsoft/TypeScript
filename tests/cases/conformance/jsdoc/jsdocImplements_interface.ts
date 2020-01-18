// @allowJs: true
// @checkJs: true
// @noEmit: true

// @Filename: /defs.d.ts
interface A {
    mNumber(): number;
}
// @Filename: /a.js
/** @implements A */
class B {
    mNumber() {
        return 0;
    }
}
/** @implements A */
class B2 {
    mNumber() {
        return "";
    }
}
/** @implements A */
class B3 {
}
