//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsReexportedCjsAlias.ts] ////

//// [lib.js]
/**
 * @param {string} a
 */
function bar(a) {
    return a + a;
}

class SomeClass {
    a() {
        return 1;
    }
}

module.exports = {
    bar,
    SomeClass
}
//// [main.js]
const { SomeClass, SomeClass: Another } = require('./lib');

module.exports = {
    SomeClass,
    Another
}

//// [lib.js]
"use strict";
/**
 * @param {string} a
 */
function bar(a) {
    return a + a;
}
class SomeClass {
    a() {
        return 1;
    }
}
module.exports = {
    bar,
    SomeClass
};
//// [main.js]
"use strict";
const { SomeClass, SomeClass: Another } = require('./lib');
module.exports = {
    SomeClass,
    Another
};


//// [lib.d.ts]
declare const _exports: {
    bar: typeof bar;
    SomeClass: typeof SomeClass;
};
export = _exports;
/**
 * @param {string} a
 */
declare function bar(a: string): string;
declare class SomeClass {
    a(): number;
}
//// [main.d.ts]
declare const _exports: {
    SomeClass: {
        new (): {
            a(): number;
        };
    };
    Another: {
        new (): {
            a(): number;
        };
    };
};
export = _exports;
