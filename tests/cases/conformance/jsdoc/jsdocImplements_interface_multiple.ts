// @allowJs: true
// @checkJs: true
// @declaration: true
// @emitDeclarationOnly: true
// @outDir: ./out

// @Filename: /defs.d.ts
interface Drawable {
    draw(): number;
}
interface Sizable {
    size(): number;
}
// @Filename: /a.js
/** 
 * @implements {Drawable} 
 * @implements Sizable 
 **/
class Square {
    draw() {
        return 0;
    }
    size() {
        return 0;
    }
}
/**
 * @implements Drawable
 * @implements {Sizable}
 **/
class BadSquare {
    size() {
        return 0;
    }
}