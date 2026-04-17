//// [tests/cases/conformance/jsdoc/declarations/jsDeclarationsClassExtendsVisibility.ts] ////

//// [bar.js]
class Bar {}
module.exports = Bar;
//// [cls.js]
const Bar = require("./bar");
const Strings = {
    a: "A",
    b: "B"
};
class Foo extends Bar {}
module.exports = Foo;
module.exports.Strings = Strings;

//// [bar.js]
"use strict";
class Bar {
}
module.exports = Bar;
//// [cls.js]
"use strict";
const Bar = require("./bar");
const Strings = {
    a: "A",
    b: "B"
};
class Foo extends Bar {
}
module.exports = Foo;
module.exports.Strings = Strings;


//// [bar.d.ts]
declare class Bar {
}
export = Bar;
//// [cls.d.ts]
declare const Bar: typeof Bar;
declare const Strings: {
    a: string;
    b: string;
};
declare class Foo extends Bar {
}
export = Foo;
export { Strings };
