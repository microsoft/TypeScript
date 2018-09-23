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
var F = F || (F = {});
(function (F) {
    var Helper = /** @class */ (function () {
        function Helper() {
        }
        return Helper;
    }());
})(F);
(function (F) {
    // Should not be an error
    var Helper = /** @class */ (function () {
        function Helper() {
        }
        return Helper;
    }());
})(F);
var Foo = Foo || (Foo = {});
(function (Foo) {
    var Helper = /** @class */ (function () {
        function Helper() {
        }
        return Helper;
    }());
})(Foo);
(function (Foo) {
    // Should not be an error
    var Helper = /** @class */ (function () {
        function Helper() {
        }
        return Helper;
    }());
})(Foo);
var Gar = Gar || (Gar = {});
(function (Gar) {
    var Foo = Foo || (Foo = {});
    (function (Foo) {
        var Helper = /** @class */ (function () {
            function Helper() {
            }
            return Helper;
        }());
    })(Foo);
    (function (Foo) {
        // Should not be an error
        var Helper = /** @class */ (function () {
            function Helper() {
            }
            return Helper;
        }());
    })(Foo);
})(Gar);
