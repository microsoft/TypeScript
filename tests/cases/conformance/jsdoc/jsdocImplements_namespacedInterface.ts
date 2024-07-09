// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: ./out

// @Filename: /defs.d.ts
declare namespace N {
    interface A {
        mNumber(): number;
    }
    interface AT<T> {
        gen(): T;
    }
}
// @Filename: /a.js
/** @implements N.A */
class B {
    mNumber() {
        return 0;
    }
}
/** @implements {N.AT<string>} */
class BAT {
    gen() {
        return "";
    }
}
