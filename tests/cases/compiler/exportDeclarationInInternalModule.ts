// @target: es5
// @module: commonjs
// @declaration: true

class Bbb {
}

class Aaa extends Bbb { }

namespace Aaa {
    export class SomeType { }
}

namespace Bbb {
    export class SomeType { }

    export * from Aaa;      // this line causes the nullref
}

var a: Bbb.SomeType;
