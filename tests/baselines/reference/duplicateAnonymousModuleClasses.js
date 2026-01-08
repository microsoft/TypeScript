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
var F;
(function (F) {
    var Helper = /** @class */ (function () {
        function Helper() {
        }
        return Helper;
    }());
})(F || (F = {}));
(function (F) {
    // Should not be an error
    var Helper = /** @class */ (function () {
        function Helper() {
        }
        return Helper;
    }());
})(F || (F = {}));
var Foo;
(function (Foo) {
    var Helper = /** @class */ (function () {
        function Helper() {
        }
        return Helper;
    }());
})(Foo || (Foo = {}));
(function (Foo) {
    // Should not be an error
    var Helper = /** @class */ (function () {
        function Helper() {
        }
        return Helper;
    }());
})(Foo || (Foo = {}));
var Gar;
(function (Gar) {
    var Foo;
    (function (Foo) {
        var Helper = /** @class */ (function () {
            function Helper() {
            }
            return Helper;
        }());
    })(Foo || (Foo = {}));
    (function (Foo) {
        // Should not be an error
        var Helper = /** @class */ (function () {
            function Helper() {
            }
            return Helper;
        }());
    })(Foo || (Foo = {}));
})(Gar || (Gar = {}));
