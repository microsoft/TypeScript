// @strict: true
// @checkJs: true
// @declaration: true
// @outDir: dist

// @filename: index.js

/** @type {{(): { doStuff(arg: number): void };}} */
function fn1() {
    return {
        doStuff(arg) { }
    }
};

/** @type {{(): { doStuff(arg: number): void }; bar: number }} */
function fn2() {
    return {
        doStuff(arg) { }
    }
};

fn2.bar = 10;
