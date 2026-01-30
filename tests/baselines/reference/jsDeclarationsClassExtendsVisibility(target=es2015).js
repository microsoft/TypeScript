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
class Bar {
}
module.exports = Bar;
//// [cls.js]
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
export = Bar;
declare class Bar {
}
//// [cls.d.ts]
export = Foo;
declare class Foo extends Bar {
}
declare namespace Foo {
    export { Strings };
}
import Bar = require("./bar");
declare namespace Strings {
    let a: string;
    let b: string;
}
