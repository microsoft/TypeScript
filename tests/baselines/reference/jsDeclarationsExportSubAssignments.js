//// [cls.js]
const Strings = {
    a: "A",
    b: "B"
};
class Foo {}
module.exports = Foo;
module.exports.Strings = Strings;

//// [cls.js]
var Strings = {
    a: "A",
    b: "B"
};
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
module.exports = Foo;
module.exports.Strings = Strings;


//// [cls.d.ts]
declare class Foo {
}
export = Foo;
declare namespace Foo {
    var Strings_1: {
        a: string;
        b: string;
    };
    export { Strings_1 as Strings };
}
