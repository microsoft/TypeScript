// @allowJs: true
// @checkJs: true
// @target: esnext
// @strict: true
// @declaration: true
// @filename: index.js
// @outDir: /out

class С1 {
    /** @type {string=} */
    p1 = undefined;

    /** @type {string | undefined} */
    p2 = undefined;

    /** @type {?string} */
    p3 = null;

    /** @type {string | null} */
    p4 = null;
}

class С2 {
    /** @type {string=} */
    get p1() {
        return undefined;
    }

    /** @type {string | undefined} */
    get p2() {
        return undefined;
    }

    /** @type {?string} */
    get p3() {
        return null;
    }

    /** @type {string | null} */
    get p4() {
        return null;
    }
}


class С3 {
    /** @type {string=} */
    get p1() {
        return undefined;
    }

    /** @param {string=} value */
    set p1(value) {
        this.p1 = value;
    }

    /** @type {string | undefined} */
    get p2() {
        return undefined;
    }

    /** @param {string | undefined} value */
    set p2(value) {
        this.p2 = value;
    }

    /** @type {?string} */
    get p3() {
        return null;
    }

    /** @param {?string} value */
    set p3(value) {
        this.p3 = value;
    }

    /** @type {string | null} */
    get p4() {
        return null;
    }

    /** @param {string | null} value */
    set p4(value) {
        this.p4 = value;
    }
}


class С4 {
    /** @param {string=} value */
    set p1(value) {
        this.p1 = value;
    }

    /** @param {string | undefined} value */
    set p2(value) {
        this.p2 = value;
    }

    /** @param {?string} value */
    set p3(value) {
        this.p3 = value;
    }

    /** @param {string | null} value */
    set p4(value) {
        this.p4 = value;
    }
}
