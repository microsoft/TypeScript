//// [tests/cases/compiler/duplicateAnonymousModuleClasses.ts] ////

//// [duplicateAnonymousModuleClasses.ts]
namespace F {

    class Helper {

    }

}


namespace F {
    
    // Should not be an error
    class Helper {

    }

}

namespace Foo {

    class Helper {

    }

}


namespace Foo {
    
    // Should not be an error
    class Helper {

    }

}

namespace Gar {
    namespace Foo {

        class Helper {

        }

    }


    namespace Foo {
    
        // Should not be an error
        class Helper {

        }

    }
}


//// [duplicateAnonymousModuleClasses.js]
"use strict";
var F;
(function (F) {
    class Helper {
    }
})(F || (F = {}));
(function (F) {
    // Should not be an error
    class Helper {
    }
})(F || (F = {}));
var Foo;
(function (Foo) {
    class Helper {
    }
})(Foo || (Foo = {}));
(function (Foo) {
    // Should not be an error
    class Helper {
    }
})(Foo || (Foo = {}));
var Gar;
(function (Gar) {
    let Foo;
    (function (Foo) {
        class Helper {
        }
    })(Foo || (Foo = {}));
    (function (Foo) {
        // Should not be an error
        class Helper {
        }
    })(Foo || (Foo = {}));
})(Gar || (Gar = {}));
