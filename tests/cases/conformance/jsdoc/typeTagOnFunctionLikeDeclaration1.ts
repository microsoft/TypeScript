// @strict: true
// @checkJs: true
// @declaration: true
// @outDir: dist

// @filename: index.js

/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test1() {
    return {
        /** @type {{(arg: string): void}} */
        doStuff(arg) { }
    }
}

/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test2() {
    return {
        /** @type {{(arg: string): void; bar: string}} */
        doStuff(arg) { }
    }
}

/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test3() {
    return {
        /** @type {{(arg: string): void}} */
        doStuff: (arg) => { }
    }
}

/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test4() {
    return {
        /** @type {{(arg: string): void; bar: string}} */
        doStuff: (arg) => { }
    }
}

/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test5() {
    return {
        /** @type {{(arg: string): void}} */
        doStuff: function (arg) { }
    }
}

/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test6() {
    return {
        /** @type {{(arg: string): void; bar: string}} */
        doStuff: function (arg) { }
    }
}
