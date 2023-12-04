//// [tests/cases/conformance/jsdoc/typeTagOnFunctionLikeDeclaration1.ts] ////

//// [index.js]
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


//// [index.js]
"use strict";
/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test1() {
    return {
        /** @type {{(arg: string): void}} */
        doStuff: function (arg) { }
    };
}
/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test2() {
    return {
        /** @type {{(arg: string): void; bar: string}} */
        doStuff: function (arg) { }
    };
}
/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test3() {
    return {
        /** @type {{(arg: string): void}} */
        doStuff: function (arg) { }
    };
}
/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test4() {
    return {
        /** @type {{(arg: string): void; bar: string}} */
        doStuff: function (arg) { }
    };
}
/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test5() {
    return {
        /** @type {{(arg: string): void}} */
        doStuff: function (arg) { }
    };
}
/** @type {{(): { doStuff(arg: 'a'): void }}}  */
function test6() {
    return {
        /** @type {{(arg: string): void; bar: string}} */
        doStuff: function (arg) { }
    };
}


//// [index.d.ts]
declare function test1(): {
    doStuff(arg: 'a'): void;
};
declare function test2(): {
    doStuff(arg: 'a'): void;
};
declare function test3(): {
    doStuff(arg: 'a'): void;
};
declare function test4(): {
    doStuff(arg: 'a'): void;
};
declare function test5(): {
    doStuff(arg: 'a'): void;
};
declare function test6(): {
    doStuff(arg: 'a'): void;
};
