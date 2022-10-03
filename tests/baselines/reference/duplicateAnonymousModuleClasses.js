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
