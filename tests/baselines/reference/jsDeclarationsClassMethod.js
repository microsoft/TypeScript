//// [jsDeclarationsClassMethod.js]
function C1() {
    /**
     * A comment prop
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    this.prop = function (x, y) {
        return x + y;
    }
}

/**
 * A comment method
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
C1.prototype.method = function (x, y) {
    return x + y;
}

/**
 * A comment staticProp
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
C1.staticProp = function (x, y) {
    return x + y;
}

class C2 {
    /**
     * A comment method1
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    method1(x, y) {
        return x + y;
    }
}

/**
 * A comment method2
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
C2.prototype.method2 = function (x, y) {
    return x + y;
}

/**
 * A comment staticProp
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
C2.staticProp = function (x, y) {
    return x + y;
}


//// [jsDeclarationsClassMethod.js]
function C1() {
    /**
     * A comment prop
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    this.prop = function (x, y) {
        return x + y;
    };
}
/**
 * A comment method
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
C1.prototype.method = function (x, y) {
    return x + y;
};
/**
 * A comment staticProp
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
C1.staticProp = function (x, y) {
    return x + y;
};
class C2 {
    /**
     * A comment method1
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    method1(x, y) {
        return x + y;
    }
}
/**
 * A comment method2
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
C2.prototype.method2 = function (x, y) {
    return x + y;
};
/**
 * A comment staticProp
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
C2.staticProp = function (x, y) {
    return x + y;
};


//// [jsDeclarationsClassMethod.d.ts]
declare function C1(): void;
declare class C1 {
    /**
     * A comment prop
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    prop: (x: number, y: number) => number;
    /**
     * A comment method
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    method(x: number, y: number): number;
}
declare namespace C1 {
    /**
     * A comment staticProp
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    function staticProp(x: number, y: number): number;
}
declare class C2 {
    /**
     * A comment method1
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    method1(x: number, y: number): number;
    /**
     * A comment method2
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    method2(x: number, y: number): number;
}
declare namespace C2 {
    /**
     * A comment staticProp
     * @param {number} x
     * @param {number} y
     * @returns {number}
     */
    function staticProp(x: number, y: number): number;
}
