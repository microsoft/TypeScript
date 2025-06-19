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
const { SomeClass, SomeClass: Another } = require('./lib');
module.exports = {
    SomeClass,
    Another
};


//// [lib.d.ts]
/**
 * @param {string} a
 */
declare function bar(a: string): string;
declare class SomeClass {
    a(): number;
}
declare const _default: {
    bar: typeof bar;
    SomeClass: typeof SomeClass;
};
export = _default;
//// [main.d.ts]
declare const _default: {
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
export = _default;
