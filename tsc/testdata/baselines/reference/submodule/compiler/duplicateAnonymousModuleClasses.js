//// [tests/cases/compiler/duplicateAnonymousModuleClasses.ts] ////

//// [duplicateAnonymousModuleClasses.ts]
module F {

    class Helper {

    }

}


module F {
    
    // Should not be an error
    class Helper {

    }

}

module Foo {

    class Helper {

    }

}


module Foo {
    
    // Should not be an error
    class Helper {

    }

}

module Gar {
    module Foo {

        class Helper {

        }

    }


    module Foo {
    
        // Should not be an error
        class Helper {

        }

    }
}


//// [duplicateAnonymousModuleClasses.js]
var F;
(function (F) {
    class Helper {
    }
})(F || (F = {}));
(function (F) {
    class Helper {
    }
})(F || (F = {}));
var Foo;
(function (Foo) {
    class Helper {
    }
})(Foo || (Foo = {}));
(function (Foo) {
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
        class Helper {
        }
    })(Foo || (Foo = {}));
})(Gar || (Gar = {}));
