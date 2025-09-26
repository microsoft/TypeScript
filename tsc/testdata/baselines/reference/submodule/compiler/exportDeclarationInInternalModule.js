//// [tests/cases/compiler/exportDeclarationInInternalModule.ts] ////

//// [exportDeclarationInInternalModule.ts]
class Bbb {
}

class Aaa extends Bbb { }

module Aaa {
    export class SomeType { }
}

module Bbb {
    export class SomeType { }

    export * from Aaa;      // this line causes the nullref
}

var a: Bbb.SomeType;


//// [exportDeclarationInInternalModule.js]
class Bbb {
}
class Aaa extends Bbb {
}
(function (Aaa) {
    class SomeType {
    }
    Aaa.SomeType = SomeType;
})(Aaa || (Aaa = {}));
(function (Bbb) {
    class SomeType {
    }
    Bbb.SomeType = SomeType;
    export * from Aaa; // this line causes the nullref
})(Bbb || (Bbb = {}));
var a;


//// [exportDeclarationInInternalModule.d.ts]
declare class Bbb {
}
declare class Aaa extends Bbb {
}
declare namespace Aaa {
    class SomeType {
    }
}
declare namespace Bbb {
    export class SomeType {
    }
    export * from Aaa;
}
declare var a: Bbb.SomeType;
