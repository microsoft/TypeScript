//// [tests/cases/conformance/jsdoc/jsdocImplements_interface_multiple.ts] ////

//// [defs.d.ts]
interface Drawable {
    draw(): number;
}
interface Sizable {
    size(): number;
}
//// [a.js]
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



//// [a.d.ts]
/**
 * @implements {Drawable}
 * @implements Sizable
 **/
declare class Square implements Drawable, Sizable {
    draw(): number;
    size(): number;
}
/**
 * @implements Drawable
 * @implements {Sizable}
 **/
declare class BadSquare implements Drawable, Sizable {
    size(): number;
}
